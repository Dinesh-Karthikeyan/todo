<script>
	let email = '';
	let password = '';
	let confirmPass = '';
	let isNewUser = true;
	let error = false;
</script>

<main>
	<h1>{isNewUser ? 'Sign IN' : 'Log IN'}</h1>
	{#if error}
		<p class="error">You have entered wrong user credentials</p>
	{/if}
	<form>
		<label>
			<p class={email ? 'above' : 'center'}>Email</p>
			<input
				bind:value={email}
				type="email"
				name="email"
				id="email"
				placeholder="Enter your email"
			/>
		</label>
		<label>
			<p class={password ? 'above' : 'center'}>Password</p>
			<input
				bind:value={password}
				type="password"
				name="password"
				id="password"
				placeholder="Enter your password"
			/>
		</label>
		{#if isNewUser}
			<label>
				<p class={confirmPass ? 'above' : 'center'}>Confirm Password</p>
				<input
					bind:value={confirmPass}
					type="password"
					name="confirmPass"
					id="confirmPass"
					placeholder="Confirm your password"
				/>
			</label>
		{/if}
		<button type="submit">Submit</button>
	</form>
	<div class="options">
		<p>OR</p>
		{#if isNewUser}
			<div>
				<p>Already have an account?</p>
				<p on:click={() => (isNewUser = false)} on:keydown={() => {}}>Log IN</p>
			</div>
		{:else}
			<div>
				<p>Don't have an account?</p>
				<p on:click={() => (isNewUser = true)} on:keydown={() => {}}>Sign UP</p>
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding: 25px;
	}
	form {
		display: flex;
		flex-direction: column;
	}
	form,
	.options {
		width: 400px;
		max-width: 100%;
		gap: 14px;
		margin: 0 auto;
	}
	form input {
		width: 100%;
		border: none;
		font-size: 1.4rem;
		padding: 14px;
		background: transparent;
	}
	input:focus {
		border: none;
		outline: none;
	}
	h1 {
		font-size: 3rem;
		margin-bottom: 10px;
	}
	form label {
		position: relative;
		border: 1px solid navy;
		border-radius: 5px;
	}
	form label:focus-within {
		border: 2px solid blue;
	}
	button {
		border: none;
		background-color: navy;
		padding: 10px;
		color: white;
		font-size: 1.3rem;
		border-radius: 5px;
		cursor: pointer;
	}
	button:hover {
		background-color: blue;
	}
	.above,
	.center {
		position: absolute;
		transform: translateY(-50%);
		pointer-events: none;
		border-radius: 5px;
		padding: 0 6px;
		font-size: 0.8 rem;
		background-color: white;
	}
	.above {
		top: 0;
	}
	.center {
		top: 50%;
		opacity: 0;
	}
	.error {
		font-size: 0.9 rem;
		color: coral;
	}
	.options {
		padding: 14px 0;
		overflow: hidden;
	}
	.options > p {
		position: relative;
		text-align: center;
		width: fit-content;
		margin: 0 auto;
		padding: 0 10px;
	}
	.options > p::after,
	.options > p::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100vw;
		height: 1.5px;
		background: black;
	}
	.options > p::before {
		left: 100%;
	}
	.options > p::after {
		right: 100%;
	}
	.options div {
		padding: 10px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.options div p:last-of-type {
		color: rgb(4, 133, 133);
		cursor: pointer;
	}
</style>
