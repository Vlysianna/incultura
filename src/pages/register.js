import React, { useState } from 'react'
import Nav from './components/Nav'
import { signIn } from 'next-auth/react'

export default function Register() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	async function submit(e) {
		e.preventDefault()
		const res = await fetch('/api/register', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ name, email, password }) })
		const j = await res.json()
		if (j.error) return setMsg(j.error)
		// auto sign in
		await signIn('credentials', { redirect: false, email, password })
		setMsg('Registered and signed in')
	}

	return (
		<div>
			<Nav />
			<main className="p-8">
				<h2 className="text-2xl font-bold mb-4">Register</h2>
				<form onSubmit={submit} className="max-w-md">
					<label className="block">Name<input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border"/></label>
					<label className="block mt-2">Email<input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border"/></label>
					<label className="block mt-2">Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full p-2 border"/></label>
					<button className="mt-4 bg-amber-600 text-white px-4 py-2">Register</button>
				</form>
				<div className="mt-2">{msg}</div>
			</main>
		</div>
	)
}
