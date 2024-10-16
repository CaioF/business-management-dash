import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type Users = {
  name: string
  age: number
}[]

export const getServerSideProps = (async () => {
  const res = await fetch('http://back:3001')
  const users: Users = await res.json()

  return { props: { users } }
}) satisfies GetServerSideProps<{ users: Users }>

export default function Page({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {users.map(user => <p>{user.name}: {user.age}</p>)}
    </div>
  )
}