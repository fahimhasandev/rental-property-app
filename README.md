`create-next-app`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## layout.jsx

- Entry point of nextjs application
- Where we can add metadata

## Page.jsx

- Home page

## Metadata

```jsx
export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};
```

## File Based Routing

`/page.jsx` - home

### Dynamic Routes

`[id]` -- folder

### Catch all Routes

`http://localhost:3000/properties/1000/rooms`

`[...id]` --> catch all

## Link component

- Link from page to page.
- Does not refresh the page like A tag.
- It actually uses client side routing.

```tsx
import Link from "next/link";
<Link href={"/properties"}>Go TO Properties</Link>;
```

### Query Param

```jsx
<Link href="/properties?name=rest">Go TO Properties</Link>
```

### Pass Object in Link

```tsx
<Link
  href={{
    pathname: "properties",
    query: { name: "test" },
  }}
>
  Go TO Properties
</Link>
```

## Client Vs Server

### Server Components

- reduce complexity
- Direct access to ORM
- Better SEO
- Secret Values Not Exposed(Not leaked to client)
  - API KEYS
  - Access Token
- Server componets are not really interactive

### Client Componets

- More Interactive
- User React Hook
- `use client`

### Newtoork Boundary

## Client Component and Navigation Hooks

### programmatically change routes/Nagivation

```tsx
import { useRouter } from "next/navigation";
<button onClick={() => router.replace("/")}>Go Home</button>;
```

### read a route's dynamic params filled in by the current URL.

```tsx

  const router = useRouter();
  const param = useParams();
  const searchParams = useSearchParams()
  const pathname = usePathname()


 <button onClick={() => router.replace("/")}>Go Home</button>
    <div>{param.id}</div>
    <div>{searchParams.get("name")}</div>
    <div>{pathname}</div>

```

### Get the **param** & **searchParams**

- Param is Promise based- so we need to use `asyn/await`

```tsx
const PropertyPage = ({ params, searchParams }) => {
  return return <>
  Property Page {id}
  property Name: {name}
  </>;
};

export default PropertyPage;
```

## Navbar Links, Dropdown State, Icons

### icons

--> `npm i react-icons`

### Navbar Link

- conditionally render the login and logout

```jsx
const [isLoggedIn, setIsLoggedIn] = useState(false); // meaning initially, we are not logged in yet
!isLoggedIn && "show the login button";
{
  !isLoggedIn && <button>Login</button>;
}
```

**Meaning:**
• When user is NOT logged in → show login button
• When user IS logged in → hide login button

```tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
onClick={() => setIsMobileMenuOpen((prev) => !prev)}

```

## Active Links & Conditional Rendering

## HomePage Components and Footer

## Property Page & PropertyCard Component

How to convert monthly and weekly price

```tsx
const getRateDisplay = () => {
  const { rates } = property;

  if (rates.monthly) {
    return `$${rates.monthly.toLocaleString()}/mo`;
  } else if (rates.weekly) {
    return `$${rates.weekly.toLocaleString()}/wk`;
  } else if (rates.nightly) {
    return `$${rates.nightly.toLocaleString()}/night`;
  }
};
```

## Custom Not Found and Loading Pages

### custom not Found

`app/not-found.jsx`
]

### Loading pages

`app/loading.jsx`
package --> `npm i react-spinners`

```jsx
"use client";

import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  //   borderColor: "red",
};

const LoadingPage = () => {
  return (
    <ClipLoader
      color={"#3b82f6"}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
```

# MongoDB Database

## Database Connection and Mongoose(ODM -Object Data Modeling)

`npm i mongodb mongoose`

- create in the root `config/database.js`
