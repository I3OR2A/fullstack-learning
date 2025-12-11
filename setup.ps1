# setup.ps1
Write-Host "== 設定 Node 版本 =="
nvm use 18.20.4

Write-Host "== 安裝 npm 套件 =="
# npm install

Write-Host "== 建立 Python 虛擬環境 =="
if (!(Test-Path ".\.fullstack-learning")) {
    python -m venv .fullstack-learning
}

Write-Host "== 啟用虛擬環境並安裝 Python 套件 =="
.\.fullstack-learning\Scripts\activate
pip install -r requirements.txt
deactivate

Write-Host "全部準備好了，你可以開始開發了 🎉"