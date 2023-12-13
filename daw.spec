# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


a = Analysis(['daw.py'],
             pathex=['C:\\Users\\iamye\\project\\programming-agency\\gui\\2019-09-09_rbeka_Python_Simple_DAW'],
             binaries=[],
             datas=[('C:\\Users\\iamye\\project\\programming-agency\\.venv\\lib\\site-packages\\eel\\eel.js', 'eel'), ('front', 'front')],
             hiddenimports=['bottle_websocket'],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          name='daw',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=False )
