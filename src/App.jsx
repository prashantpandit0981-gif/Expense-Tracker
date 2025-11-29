import { useState, useEffect } from "react";
import DataManager from "./components/Settings/DataManager";
import Navbar from "./components/Layout/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import AddExpense from "./components/Expenses/AddExpense";
import AddIncome from "./components/Income/AddIncome";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "./utils/storage";
import "./App.css";
// added supabase in auth 
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://tayvyzvbyigtxsjkvclz.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRheXZ5enZieWlndHhzamt2Y2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMTE3NTcsImV4cCI6MjA3NzY4Nzc1N30.Kvs7bcdN7V5uPWxeBVlrDP-EIwUjZQzp4ICFIzPnBOQ"
);

// 🔥 Added Auth pages
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

function App() {
  // Start at login page
  const [currentView, setCurrentView] = useState("login");

  // Load data from localStorage or use defaults
  const [currency, setCurrency] = useState(() =>
    loadFromStorage(STORAGE_KEYS.CURRENCY, "USD")
  );

  const [incomes, setIncomes] = useState(() =>
    loadFromStorage(STORAGE_KEYS.INCOMES, [
      {
        id: 1,
        description: "Monthly Salary",
        amount: 5000,
        category: "Salary",
        date: "2024-01-01",
      },
      {
        id: 2,
        description: "Freelance Project",
        amount: 800,
        category: "Freelance",
        date: "2024-01-10",
      },
    ])
  );

  const [budgets, setBudgets] = useState(() =>
    loadFromStorage(STORAGE_KEYS.BUDGETS, [
      { id: 1, category: "Food", limit: 500 },
      { id: 2, category: "Transport", limit: 200 },
      { id: 3, category: "Entertainment", limit: 150 },
    ])
  );

  const [expenses, setExpenses] = useState(() =>
    loadFromStorage(STORAGE_KEYS.EXPENSES, [
      {
        id: 1,
        description: "Grocery Shopping",
        amount: 50,
        category: "Food",
        date: "2024-01-20",
      },
      {
        id: 2,
        description: "Uber Ride",
        amount: 15,
        category: "Transport",
        date: "2024-01-19",
      },
      {
        id: 3,
        description: "Netflix Subscription",
        amount: 12,
        category: "Entertainment",
        date: "2024-01-18",
      },
      {
        id: 4,
        description: "Electricity Bill",
        amount: 80,
        category: "Utilities",
        date: "2024-01-17",
      },
      {
        id: 5,
        description: "Restaurant Dinner",
        amount: 45,
        category: "Food",
        date: "2024-01-16",
      },
      {
        id: 6,
        description: "Gas Station",
        amount: 40,
        category: "Transport",
        date: "2024-01-15",
      },
      {
        id: 7,
        description: "Medical Checkup",
        amount: 100,
        category: "Healthcare",
        date: "2024-01-14",
      },
    ])
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.EXPENSES, expenses);
  }, [expenses]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.INCOMES, incomes);
  }, [incomes]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BUDGETS, budgets);
  }, [budgets]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CURRENCY, currency);
  }, [currency]);

  const currencies = {
    USD: { symbol: "$", name: "US Dollar" },
    EUR: { symbol: "€", name: "Euro" },
    GBP: { symbol: "£", name: "British Pound" },
    INR: { symbol: "₹", name: "Indian Rupee" },
    JPY: { symbol: "¥", name: "Japanese Yen" },
    CAD: { symbol: "C$", name: "Canadian Dollar" },
    AUD: { symbol: "A$", name: "Australian Dollar" },
    CNY: { symbol: "¥", name: "Chinese Yuan" },
  };

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setCurrentView("dashboard");
  };

  const handleAddIncome = (newIncome) => {
    setIncomes([newIncome, ...incomes]);
    setCurrentView("dashboard");
  };

  return (
    <div className="App min-vh-100" style={{ backgroundColor: "#0f0f0f" }}>
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currency={currency}
        setCurrency={setCurrency}
        currencies={currencies}
      />

      <div className="container mt-4 pb-5">
        {/* 📌 Dashboard */}
        {currentView === "dashboard" && (
          <Dashboard
            expenses={expenses}
            setExpenses={setExpenses}
            incomes={incomes}
            setIncomes={setIncomes}
            currency={currencies[currency]}
            budgets={budgets}
            setBudgets={setBudgets}
          />
        )}

        {/* 📌 Add Expense */}
        {currentView === "add" && (
          <>
            <h2 className="text-light mb-4">Add Expense</h2>
            <AddExpense
              onAddExpense={handleAddExpense}
              onClose={() => setCurrentView("dashboard")}
              currency={currencies[currency]}
            />
          </>
        )}

        {/* 📌 Add Income */}
        {currentView === "income" && (
          <>
            <h2 className="text-light mb-4">Add Income</h2>
            <AddIncome
              onAddIncome={handleAddIncome}
              onClose={() => setCurrentView("dashboard")}
              currency={currencies[currency]}
            />
          </>
        )}

        {/* 📌 Settings */}
        {currentView === "settings" && (
          <>
            <h2 className="text-light mb-4">Settings</h2>
            <DataManager
              expenses={expenses}
              incomes={incomes}
              budgets={budgets}
              currency={currency}
            />
          </>
        )}

        {/* 🔥 NEW — Login Page */}
        {currentView === "login" && (
          <Login setCurrentView={setCurrentView} />
        )}

        {/* 🔥 NEW — Signup Page */}
        {currentView === "signup" && (
          <Signup setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  );
  
}

export default App;


