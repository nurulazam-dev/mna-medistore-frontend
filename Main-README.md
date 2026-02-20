# [MNA-MediStore Frontend](https://mna-medistore.vercel.app/)

## MNA-MediStore Backend - [Repo Link:](https://github.com/nurulazam-dev/mna-medistore-backend)

### Admin Credentials

| Item           |     Credential      |
| -------------- | :-----------------: |
| Admin Email    | admin@medistore.com |
| Admin Password |      Admin123       |

# Project overview & features:

### Public

| Item     |         access          |
| -------- | :---------------------: |
| Medicine |   browse the medicine   |
| cart     | add to medicine in cart |

etc...

### Admin

| Item       |                     access                      |
| ---------- | :---------------------------------------------: |
| Overview   |      dashboard display the full shop stats      |
| Categories |     Only admin can add and update category      |
| Medicines  | admin can view and update any seller's medicine |
| Users      |     admin can view, update and blocked user     |
| Orders     |  admin can view and update all seller's order   |
| Profile    |          admin can update own profile           |

etc...

### Seller

| Item        |                              access                              |
| ----------- | :--------------------------------------------------------------: |
| Overview    |        dashboard display the seller's information & stats        |
| Medicines   | seller can add, update and Inactive(not delete) his own medicine |
| Orders      |    seller can view and update his own medicines order status     |
| Profile     |                  seller can update own profile                   |
| Reg & Login |                  Register and Login as a seller                  |

etc...

### Customer

| Item        |                              access                              |
| ----------- | :--------------------------------------------------------------: |
| Overview    |       dashboard display the customer's information & stats       |
| Orders      | customer can view order and cancel own order (before processing) |
| Profile     |                 customer can update own profile                  |
| Reg & Login |                 Register and Login as a customer                 |

etc...

## Tech Stack:

### Frontend

| Technology          | Purpose             |
| ------------------- | ------------------- |
| Next.js             | App Router, SSR/SSG |
| TypeScript          | Type safety         |
| Tailwind CSS        | Styling             |
| better auth         | add the details     |
| t3-oss/env-nextjs   | add the details     |
| tanstack/env-nextjs | add the details     |
| zod                 | add the details     |
| cloudinary          | add the details     |
| Redux               | add the details     |
| Recharts            | add the details     |
| sharp               | add the details     |
| sonner              | add the details     |

### Deployment

| Service | Purpose             |
| ------- | ------------------- |
| Vercel  | Frontend deployment |

### Use guideline:

// frontend run port: 3000
// clone ...
// run command: pnpm run dev
// build command: pnpm run build
