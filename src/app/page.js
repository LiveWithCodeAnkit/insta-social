import Login from "@/components/Auth/login/Login";

export default function Home() {
  return (
    <>
      <Login
        title="Brands"
        pathLoc="/creator"
        linkTitle="Creators"
        role="BRAND"
      />
    </>
  );
}
