# FlexRent 🏠

FlexRent is a financial dashboard designed to help tenants track their
finances, verify income sources, and calculate their **Rent Power** to
facilitate flexible rent payments.

---

## 🚀 Features

- **Dashboard Overview:** Visualize your financial health and Rent
  Power coverage.\
- **Wallet Management:** Link multiple funding sources (Salary,
  Savings, Credit).\
- **Transaction Tracking:** Comprehensive history with filtering by
  Date, Account, Type, and Category.\
- **Smart Categorization:** Automatically categorize transactions
  (Rent, Salary, Service Charge).\
- **Responsive Design:** Fully optimized for desktop and mobile using
  Material UI.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)\
- **Language:** TypeScript\
- **Database:** PostgreSQL\
- **ORM:** Prisma\
- **UI Library:** Material UI (MUI)\
- **Package Manager:** pnpm

---

## 📦 Getting Started

### **Prerequisites**

- Node.js (v18 or higher)\
- pnpm (`npm install-g pnpm`)\
- PostgreSQL database

---

### **Installation**

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/flexrent.git
cd flexrent
```

#### 2. Install dependencies

```bash
pnpm install
```

---

### **Environment Setup**

Create a `.env` file in the root directory and add your database
connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/flexrent_db?schema=public"
```

---

### **Database Setup (Prisma)**

Push the schema and generate the Prisma client:

```bash
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma generate
```

---

### **Run the development server**

```bash
pnpm dev
```

Then open:\
**http://localhost:3000**

---

## 🗄️ Database Schema

This project uses Prisma with the following core models:

- **User:** The main identity\
- **Account:** Bank accounts or credit lines linked to the user\
- **Transaction:** Financial records linked to both User and Account

To view the database GUI:

```bash
pnpm dlx prisma studio
```

---

## 📄 License

Distributed under the **MIT License**.

---

## 📞 Contact

Bryan Somto - [LinkedIn](https://www.linkedin.com/in/bryansomto)

Project Link: [https://github.com/bryansomto/FlexRent](https://github.com/bryansomto/FlexRent)
