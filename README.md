# 📧 Email Archiver with OAuth Integration (NestJS + Gmail API + Google Drive)

## 🧩 Overview

This project is a complete **Email Archiving System** that integrates with a G-Suite inbox using the Gmail API and OAuth 2.0. It captures incoming emails, stores metadata in a PostgreSQL database, and uploads attachments to Google Drive. This ensures **secure, automated, and complete compliance-friendly email backup**.

---

## ✅ Assessment Task

**User Story**:
*As a business user, I want all incoming emails from our G-Suite inbox to be automatically stored in our database, so that I can maintain a complete record of all communications for compliance and reference.*

### Scope

* Single G-Suite inbox integration using Gmail API & OAuth 2.0
* Archive full emails: subject, body (HTML/Text), metadata
* Store attachments on Google Drive with DB links
* Preserve threading, handle duplicates and recipients correctly

### Acceptance Criteria

| # | Criteria                                                               |
| - | ---------------------------------------------------------------------- |
| 1 | OAuth authentication without password storage                          |
| 2 | Capture and store all emails in PostgreSQL within 5 minutes of receipt |
| 3 | Upload attachments to Google Drive and link in DB                      |
| 4 | Properly store sender, recipients, timestamps, and headers             |
| 5 | Preserve threading using threadId/messageId                            |
| 6 | Support multiple recipients, CC, and BCC                               |
| 7 | Avoid duplicate email storage                                          |

---

## 🔧 Tech Stack

* **Backend**: NestJS (Node.js framework)
* **Database**: PostgreSQL
* **OAuth & APIs**: Google Gmail API, Google Drive API
* **Libraries**: `googleapis`, `pg`, `dotenv`, `@nestjs/*`

---

## 📁 Project Structure

```
email-archiver/
├── dist/
├── node_modules/
├── src/
│   ├── attachment/
│   ├── auth/
│   ├── drive/
│   ├── email/
│   ├── google/
│   └── app.module.ts
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/email-archiver-nest.git
cd email-archiver-nest
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Google Cloud Setup

* Create a project in [Google Cloud Console](https://console.cloud.google.com/)
* Enable **Gmail API** and **Google Drive API**
* Create **OAuth 2.0 Client ID**
* Download `credentials.json` and place in `src/google/`

---

## 🔐 Environment Variables (`.env`)

```env
PORT=3000
GMAIL_CLIENT_ID=your_client_id.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REDIRECT_URI=http://localhost:3000/auth/redirect
GMAIL_REFRESH_TOKEN=your_refresh_token
DATABASE_URL=postgresql://user:password@localhost:5432/email_archive
```

---

## 🚀 Run the Application

```bash
npm run start:dev
```

---

## 🛠️ Features & Implementation

### ✅ OAuth Integration

* Uses Gmail OAuth 2.0 flow
* Tokens stored securely
* Refresh token logic implemented

### ✅ Email Fetching

* Uses Gmail API to poll and fetch unread emails
* History ID tracking for deltas
* Handles large inboxes with pagination

### ✅ Email Parsing

* Extracts:

  * `messageId`, `threadId`
  * `from`, `to`, `cc`, `bcc`
  * `subject`, `timestamp`
  * `body` (text and HTML)

### ✅ Attachment Upload

* Detects attachments in email payload
* Uploads to Google Drive via API
* Stores metadata and Drive link in PostgreSQL

### ✅ Threading & Deduplication

* `threadId` & `messageId` stored
* Prevents duplicate storage

---

## 🧪 Testing & Validation

* ✅ Manually validated with Gmail test inbox
* ✅ Performance tested with large thread chains
* ✅ Token refresh tested
* ✅ Attachments of various sizes tested

---

## 📹 Loom Walkthrough

🎥 [Click to watch the demo (face visible)](https://loom.com/share/your-video-link)

---

## 📬 Author

**Ashish Pandya**
📧 [ashish@example.com](mailto:ashish@example.com)
🐙 [GitHub](https://github.com/AshishPandya-AI)
