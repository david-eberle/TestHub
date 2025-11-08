# 🧪 TestHub

**TestHub** is a full-stack web application designed to **centralize, visualize, and analyze automated test results** from CI pipelines like **GitHub Actions** or **Jenkins**.  
It’s built with **.NET Core**, **React**, and **Azure** services, offering a unified dashboard for QA and DevOps teams.

---

## 🚀 Features

- 📊 **Dashboard** with test statistics (pass rate, average duration, trends)
- 🧾 **Detailed test runs** with job name, branch, commit, and timestamp
- 🔁 **Integration-ready** with GitHub Actions or Jenkins via simple REST API calls
- 💾 **Database storage** (Azure SQL / PostgreSQL)
- ☁️ **Deployed on Azure** (App Service + Static Web App)
- 🔐 Optional **API key or OAuth** authentication
- 🛠️ Future: Slack / Teams notifications when tests fail

---

## 🧠 Architecture Overview

```text
+---------------------+          +--------------------+
| GitHub Actions /    |  POST →  | .NET Core API      |
| Jenkins Pipeline    | -------- | (TestHub Backend)  |
| (Cypress, Synpress) |          +--------------------+
| Generates JSON      |          | Stores in DB       |
+---------------------+          | (Azure SQL)        |
                                +--------------------+
                                             ↓
                                   +----------------+
                                   | React Frontend |
                                   | (TestHub UI)   |
                                   +----------------+
```
---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | .NET 8 Web API |
| Frontend | React + Vite + TypeScript |
| Database | Azure SQL Database |
| Hosting | Azure App Service / Static Web Apps |
| Auth (optional) | Microsoft OAuth or API key |
| CI Integrations | GitHub Actions, Jenkins |

---

## 📦 Example Workflow Integration (GitHub Actions)

```yaml
- name: Run Cypress Tests
  run: pnpm cypress run --reporter json --reporter-options output=cypress/results/output.json

- name: Upload Test Results to TestHub
  run: |
    curl -X POST https://testhub-api.azurewebsites.net/api/test-results       -H "Content-Type: application/json"       -H "x-api-key: ${{ secrets.TESTHUB_API_KEY }}"       -d "@cypress/results/output.json"
```

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/test-results` | Upload new test results (JSON) |
| `GET` | `/api/test-results` | List all test runs |
| `GET` | `/api/test-results/{id}` | Get details of a specific run |
| `GET` | `/api/stats` | Get aggregated statistics |

---

## 🖥️ Local Development

### Prerequisites
- .NET 8 SDK   

### Steps

```bash
# Backend
cd backend
npm run start-prod-local
```

Then open [http://localhost:5200](http://localhost:5200)

---

## 📊 Future Enhancements

- Trend comparison per branch  
- Email/Slack notifications  
- Multi-project support  

---

## 👨‍💻 Author

**David Eberle**  
🔗 [LinkedIn](https://www.linkedin.com/in/leonardo-david-eberle/)

---

## 📝 License

MIT License © 2025 David Eberle
