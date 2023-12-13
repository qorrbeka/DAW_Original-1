# 고등학교 음악교사를 위한 수행평가 보조프로그램
import eel
import pygame.midi
from midiutil import MIDIFile
import logging
import mido

glt = None
player = None
can_play_midi = True

# MyMIDI 객체를 함수 내부에 생성하지 않고 전역으로 선언하여 미리 사용 가능하도록 함
MyMIDI = MIDIFile(10)

# 리스트 형태로 미리 노트들을 저장할 전역 변수를 생성
note_list = []
duration_list = []
filename = ""

@eel.expose
def save_filename(msg):
    logging.warning("save_filename")
    logging.warning(msg)
    global filename
    filename = msg+".mid"

@eel.expose
def debug_log(msg):
    logging.warning("debug_log")
    logging.warning(msg)


@eel.expose
def note_on(note, velocity, duration):
    # Midi note 를 켜는 함수
    if note:
        if can_play_midi:
            player.note_on(note, velocity)
        else:
            ""  # play(note, duration)


@eel.expose
def note_off(note):
    # Midi note 를 끄는 함수
    if note:
        if can_play_midi:
            player.note_off(note)


@eel.expose
def chord_on(notes, velocity, duration):
    # Midi note 를 켜는 함수-화음용
    for note in notes:
        if can_play_midi:
            player.note_on(note, velocity)
        else:
            ""  # play(note, duration)


@eel.expose
def chord_off(notes):
    # Midi note 를 끄는 함수 화음용
    for note in notes:
        if can_play_midi:
            player.note_off(note)


# 미디파일로 변환 및 저장하는 함수(미완)
"""@eel.expose
def save_note_on(note, velocity, duration):
    from midiutil import MIDIFile

    track = 0
    channel = 0
    time = 0  # In beats
    tempo = 60  # In BPM
    volume = 100  # 0-127, as per the MIDI standard

    MyMIDI = MIDIFile(1)  # One track, defaults to format 1 (tempo track
    # automatically created)
    MyMIDI.addTempo(track, time, tempo)

    MyMIDI.addNote(track, channel, note, time, duration, volume)
    time = time + 1

    with open("major-scale.mid", "wb") as output_file:
        MyMIDI.writeFile(output_file)
    pass
"""


# 기존의 @eel.expose 데코레이터와 함께 수정된 함수 정의
@eel.expose
def save_note_on(note, duration):
    global note_list  # 전역으로 선언된 note_list를 사용하도록 함\
    global duration_list
    # 노트를 리스트에 추가 (여러 노트를 저장해뒀다가 마지막에 MIDI 파일로 저장하기 위함)
    note_list.append(note)
    duration_list.append(int(duration))
    logging.warning("save_note_on")
    logging.warning(note_list)
    logging.warning(duration_list)
    # save_to_midi_file()


# MIDI 파일을 저장하는 함수
@eel.expose
def save_to_midi_file():
    global MyMIDI
    global note_list
    global filename

    track = 0
    channel = 0
    time = 0  # In beats
    tempo = 120  # In BPM
    volume = 100  # 0-127, as per the MIDI standard

    MyMIDI = MIDIFile(1)
    MyMIDI.addTempo(track, time, tempo)

    i = 0
    for note in note_list:
        logging.warning("save midi file")
        logging.warning(duration_list[i])
        MyMIDI.addNote(track, channel, note, time, 4/duration_list[i], volume)  # 1은 노트의 기본 길이 (1박자)
        time += 1
        i += 1

    with open(filename, "wb") as output_file:
        MyMIDI.writeFile(output_file)
    pass


# MIDI 파일을 불러오는 함수
@eel.expose
def load_from_midi_file():
    global filename

    note_list2 = []
    mid = mido.MidiFile(filename)
    # print(mid)
    for track in mid.tracks:
        for msg in track:
            print(msg)
            if not msg.is_meta and msg.type == 'note_on':
                #print(msg)
                print(msg.note, msg.velocity)
                note_list2.append(msg.note)

    return(note_list2)


@eel.expose
def save_note_off(note):
    pass


@eel.expose
def save_chord_on(note, velocity, duration):
    pass


@eel.expose
def save_chord_off(note):
    pass


if __name__ == '__main__':
    # 음계를 재생하기 위해 pygame 라이브러리를 사용
    pygame.midi.init()

    # 기본 Midi 장치 식별자를 가져온다
    port = pygame.midi.get_default_output_id()

    # Midi 음악을 재생하기 위한 Midi Output 인스턴스를 가져온다
    try:
        player = pygame.midi.Output(port, 0)
        
        player.set_instrument(0)  # Acoustic Grand Piano
    except pygame.midi.MidiException:
        can_play_midi = False

    # GUI를 실행하기 위한 기본 설정
    options = {
        'mode': 'chrome-app',
        'port': 58912,
    }
    eel.init('front')
    # eel.start('main.html', size=(800, 800), suppress_error=True)
    eel.start('index.html', size=(800, 800), suppress_error=True)

    # 앱이 종료된 뒤 자원을 반환한다(없으면 자원관련 버그)
    player.close()
    pygame.midi.quit()

    # 저장, 메뉴, 디자인, 각종 자잘한 버그들, 악보 속도, 프레임(교사가 질문지 생성)
