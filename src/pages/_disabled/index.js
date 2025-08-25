// Backup of original pages index (moved to _disabled to avoid conflict with app router)
export default function HomeRedirect() {
  return (
    <div className="p-8 text-center">
      <p>Redirecting to landing page… (disabled backup)</p>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}
