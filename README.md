# Discord Dev Logger Bot

Bot Discord untuk mencatat aktivitas development secara otomatis dari GitHub seperti:

- Notifikasi repository dibuat
- Notifikasi commit
- Pull request
- Issues
- Dev log manual (/log)
- Todo (/todo)
- Notes (/note)

Bot ini dideploy menggunakan **Replit** dan menggunakan **GitHub Webhook**.

---

# Fitur

- GitHub → Discord commit notification
- GitHub → Discord repo created notification
- GitHub → Discord PR notification
- GitHub → Discord issue notification
- Slash command log
- Slash command todo
- Slash command note

---

# Struktur Channel Discord

Buat channel berikut di server Discord:

```
#repo-created
#commit-log
#pull-requests
#issues
#daily-log
#todo
#notes
```

---

# Deploy ke Replit

## 1. Buat Replit Project

- Buka https://replit.com
- Create Repl
- Pilih **Node.js**
- Upload semua file project

```
index.js
webhook.js
commands.js
package.json
```

---

## 2. Tambahkan Environment Variables

Masuk ke:

```
Tools → Secrets
```

Tambahkan:

```
TOKEN=DISCORD_TOKEN
GUILD_ID=SERVER_ID

COMMIT_CHANNEL=CHANNEL_ID
REPO_CHANNEL=CHANNEL_ID
PR_CHANNEL=CHANNEL_ID
ISSUE_CHANNEL=CHANNEL_ID

LOG_CHANNEL=CHANNEL_ID
TODO_CHANNEL=CHANNEL_ID
NOTE_CHANNEL=CHANNEL_ID
```

---

## 3. Jalankan Bot

Klik tombol:

```
Run
```

Jika berhasil akan muncul:

```
Logged in as bot
GitHub webhook running on port 3000
```

---

# Setup GitHub Webhook

## 1. Ambil URL Replit

Setelah klik run, Replit akan memberi URL:

```
https://discord-dev-bot.username.repl.co
```

Webhook URL kamu:

```
https://discord-dev-bot.username.repl.co/github
```

PENTING: harus ada `/github`

---

## 2. Buat GitHub App

Masuk ke:

```
GitHub → Settings → Developer Settings → GitHub Apps
```

Klik:

```
New GitHub App
```

Isi:

App name:

```
discord-dev-logger
```

Homepage URL:

```
https://github.com
```

Webhook URL:

```
https://REPL_URL/github
```

Contoh:

```
https://discord-dev-bot.username.repl.co/github
```

---

## 3. Permissions

Repository permissions:

Repository metadata:

```
Read-only
```

Contents:

```
Read-only
```

Pull requests:

```
Read-only
```

Issues:

```
Read-only
```

---

## 4. Subscribe Events

Centang:

```
Repository
Push
Pull request
Issues
```

Klik:

```
Create GitHub App
```

---

## 5. Install GitHub App

Klik:

```
Install App
```

Pilih:

```
All repositories
```

Klik Install.

---

# Test

## Test Repo Created

Buat repo baru di GitHub

Discord akan kirim:

```
Repository Created
repo: nama-repo
```

---

## Test Commit

Push commit:

```
git commit -m "test"
git push
```

Discord akan kirim:

```
New Commit
repo: project
message: test
```

---

# Slash Commands

Log:

```
/log belajar redis
```

Todo:

```
/todo buat auth
```

Note:

```
/note pakai redis cache
```

---

# Arsitektur

```
GitHub
   ↓
Webhook
   ↓
Replit Bot
   ↓
Discord Server
```

---

# Teknologi

- Node.js
- discord.js
- express
- GitHub webhook
- Replit hosting

---

# Author

Dev Logger Discord Bot
