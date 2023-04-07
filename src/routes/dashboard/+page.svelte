<script>
	import ShortUniqueId from 'short-unique-id';
	// import {authStore} from '../../stores/store'
	const uid = new ShortUniqueId();

	let task = '';
	// let todos  = $authStore.data.todo;
	let todos = [];
	// $: $authStore.data.todo = todos
	
	function addTask(event) {
		if (event.key === 'Enter') {
			const todoTask = {
				task: task,
				done: false,
				id: uid()
			};
			todos = [todoTask, ...todos];
			// $authStore.data.todo = todos;
			task = '';
		}
	}

	function handleAdd() {
		const todoTask = {
			task: task,
			done: false,
			id: uid()
		};
		todos = [todoTask, ...todos];
		task = '';
	}
	function deletItem(id) {
		todos = todos.filter((item) => item.id != id);
	}
	function doEdit(id) {
		todos.forEach((item) => {
			if (item.id === id) {
				task = item.task;
			}
		});
		deletItem(id);
	}
</script>

<main>
	<header>
		<h1>TODO</h1>
	</header>
	<div class="formBox">
		<form>
			<label>
				<input bind:value={task} on:keydown={addTask} type="text" />
				<img on:click={handleAdd} on:keydown={() => {}} src="/dashboard/add.png" alt="add icon" />
			</label>
		</form>
		<div class="todoBlock">
			{#each todos as todo (todo.id)}
				<div class="task">
					<span on:click={() => (todo.done = !todo.done)} on:keydown={() => {}}>
						{todo.done ? '✔️' : '[ ]'}
					</span>
					<span>{todo.task}</span>
					<span>
						<img
							src="/dashboard/edit.png"
							alt="edit icon"
							on:click={() => {
								doEdit(todo.id);
							}}
							on:keydown={() => {}}
						/>
						<img
							src="/dashboard/delete.png"
							alt="delete icon"
							on:click={() => {
								deletItem(todo.id);
							}}
							on:keydown={() => {}}
						/>
					</span>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 25px;
		min-height: 100vh;
	}
	h1 {
		font-size: 2rem;
	}
	.formBox {
		display: flex;
		flex-direction: column;
	}
	label {
		border: 1px solid black;
		padding: 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius:5px;
		width: 500px;
	}
	input:focus, input {
		outline: none;
		border:none;
		width: 100%;
		font-size: 1.3rem;
	}
	img {
		height:  25px;
		width: auto ;
	}
	.todoBlock {
		margin-top:20px;
	}
	.task {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 10px;
	}
</style>
