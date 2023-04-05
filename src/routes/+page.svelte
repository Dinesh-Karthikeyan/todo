<script>
	let email = '';
	let password = '';
	let confirmPass = '';
	let isNewUser = true;
	let error = false;
</script>

<main>
	<h1>{isNewUser ? 'Sign IN':'Log IN'}</h1>
	{#if error}
		<p>You have entered wrong user credentials</p>
	{/if}
	<form>
		<label>
			<input bind:value={email} type="email" name="email" id="email" placeholder="Enter your email" />
		</label>
		<label>
			<input bind:value={password} type="password" name="password" id="password" placeholder="Enter your password" />
		</label>
		{#if isNewUser}
			<label>
				<input bind:value={confirmPass}
					type="password"
					name="confirmPass"
					id="confirmPass"
					placeholder="Confirm your password"
				/>
			</label>
		{/if}
		<button type="submit">Submit</button>
	</form>
	<div>
		<p>OR</p>
		{#if isNewUser}
			<p>Already have an account?</p>
			<p on:click={() => isNewUser=false} on:keydown={()=>{}}>Log IN</p>
		{:else}
			<p>Don't have an account?</p>
			<p on:click={() => isNewUser=true} on:keydown={()=>{}}>Sign UP</p>
		{/if}
	</div>
</main>
