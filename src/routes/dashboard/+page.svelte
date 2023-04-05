<script>
	import ShortUniqueId from 'short-unique-id';
	const uid = new ShortUniqueId();

	let task = '';
	let todos = [];

	function addTask(event) {
		if (event.key === 'Enter') {
			const todoTask = {
				task: task,
				done: false,
				id: uid()
			};
			todos = [...todos, todoTask];
		}
	}
</script>

<main>
	<header>
		<h1>TODO</h1>
	</header>
	<form>
		<label>
			<input bind:value={task} on:keydown={addTask} type="text" />
			<button><img src="/dashboard/add.png" alt="add icon" /></button>
		</label>
	</form>
	<div>
		{#each todos as todo}
			<div>
				<span on:click={() => (todo.done = !todo.done)} on:keydown={() => {}}>
					{todo.done ? '✔️' : '[ ]'}
				</span>
				<span>{todo.task}</span>
				<span>
					<img src="/dashboard/edit.png" alt="edit icon" />
					<img src="/dashboard/delete.png" alt="delete icon" />
				</span>
			</div>
		{/each}
	</div>
</main>
