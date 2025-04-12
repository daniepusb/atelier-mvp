# Project Architecture

--- 

## Frontend
- Framework: **React** + **TypeScript**
- Styling: **Tailwind CSS**
- State management: React hooks (local) + props

--- 

## Backend
- **Firebase Auth**: user management
- **Cloud Firestore**: NoSQL database
- **Firebase Storage**: customer photos (coming soon)

--- 

## Roles
- `admin`: manages items and tasks for your brand
- `worker`: creates quotes and clients

---

## Navigation
- Login → Dashboard → [Actions by role]

--- 

## Security
- Strict rules in Firestore based on `auth.uid` and `brandId`