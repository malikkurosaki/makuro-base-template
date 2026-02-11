# 🔐 1. AUTHENTICATION (CRITICAL PATH)

## Signup

| Scenario                      | Expected                   | Priority  |
| ----------------------------- | -------------------------- | --------- |
| Signup dengan data valid      | Redirect ke dashboard      | 🔴 High   |
| Signup email duplicate        | Error muncul               | 🔴 High   |
| Password terlalu pendek       | Validation error           | 🟡 Medium |
| Field kosong                  | Validation error           | 🟡 Medium |
| Setelah signup, session aktif | Bisa akses protected route | 🔴 High   |

---

## Login

| Scenario                  | Expected               | Priority  |
| ------------------------- | ---------------------- | --------- |
| Login valid               | Redirect dashboard     | 🔴 High   |
| Password salah            | Error muncul           | 🔴 High   |
| Email tidak terdaftar     | Error muncul           | 🟡 Medium |
| Reload page setelah login | Tetap login            | 🔴 High   |
| Logout                    | Redirect signin        | 🔴 High   |
| Logout lalu back button   | Tetap tidak bisa akses | 🔴 High   |

---

## Session & Security

| Scenario                         | Expected        | Priority  |
| -------------------------------- | --------------- | --------- |
| Access /admin tanpa login        | Redirect signin | 🔴 High   |
| Manipulasi token di localStorage | Logout paksa    | 🟡 Medium |
| Session expired                  | Redirect signin | 🟡 Medium |
| Multi-tab login                  | Sync state      | 🟢 Low    |

---

# 🛂 2. AUTHORIZATION (ROLE BASED)

## Admin Access

| Scenario                           | Expected          |
| ---------------------------------- | ----------------- |
| User biasa ke /admin               | 403 atau redirect |
| Admin ke /admin                    | Bisa akses        |
| Direct URL /admin/settings         | Tetap divalidasi  |
| API call admin endpoint tanpa role | 403               |

---

# 🔑 3. API KEY MANAGEMENT (FULL CRUD)

📁 `admin/apikey.tsx` + `api/apikey.ts`

## Create

| Scenario          | Expected           |
| ----------------- | ------------------ |
| Create API key    | Key muncul di list |
| Create tanpa nama | Validation error   |
| Reload page       | Key tetap ada      |

## Delete

| Scenario             | Expected         |
| -------------------- | ---------------- |
| Delete key           | Hilang dari list |
| Delete key user lain | 403              |

## Regenerate

| Scenario            | Expected    |
| ------------------- | ----------- |
| Regenerate key      | Key berubah |
| Old key tidak valid | API reject  |

---

# 👤 4. PROFILE MANAGEMENT

📁 `profile/index.tsx`, `profile/edit.tsx`

| Scenario                          | Expected         |
| --------------------------------- | ---------------- |
| Update nama                       | Persist di DB    |
| Update email invalid              | Validation error |
| Reload                            | Data tetap       |
| User A tidak bisa lihat profile B |                  |

---

# 🧭 5. NAVIGATION INTEGRITY

📁 router + SPA behavior

| Scenario                    | Expected     |
| --------------------------- | ------------ |
| Semua link header berfungsi | Tidak error  |
| Browser back                | Route sesuai |
| Browser forward             | Route sesuai |
| Route tidak ada             | 404 page     |
| Refresh di nested route     | Tidak blank  |

---

# 🏗 6. PRODUCTION BUILD TEST

Ini sering dilupakan.

Flow setelah:

```
bun run build
bun run start (production)
```

Test:

| Scenario             | Expected            |
| -------------------- | ------------------- |
| Load /               | OK                  |
| Signup → Login       | OK                  |
| CRUD API key         | OK                  |
| Hard refresh /admin  | Tidak 404           |
| Assets load          | Tidak 404           |
| Env production aktif | Tidak pakai dev URL |

---

# 🗄 7. DATABASE BEHAVIOR (BLACKBOX)

| Scenario          | Expected                |
| ----------------- | ----------------------- |
| User A buat data  | User B tidak bisa lihat |
| Delete user       | Cascade delete jalan    |
| Transaction gagal | Rollback                |

---

# 🧪 8. EDGE CASES (Jarang Ditest Tapi Penting)

| Scenario           | Expected                |
| ------------------ | ----------------------- |
| Double submit form | Tidak duplicate         |
| Slow network       | UI loading state muncul |
| Server 500         | Error UI graceful       |
| API timeout        | Retry atau error tampil |

---

# 🧠 Struktur Spec Ideal untuk Project Kamu

```
__tests__/e2e/
  auth.spec.ts
  session.spec.ts
  authorization.spec.ts
  profile.spec.ts
  apikey.spec.ts
  navigation.spec.ts
  production.spec.ts
  edgecases.spec.ts
```

---

# 🎯 Coverage Target Realistis

Untuk SaaS seperti ini:

* Auth flow → 100%
* Admin CRUD → 100%
* Navigation → 90%
* Edge case → 60–70%
