<script>
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { authStore, dbHandler } from '../stores/store';
	const nonAuthRoutes = ['/'];
	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;
			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}
			if (user && currentPath === '/') {
				window.location.href = '/dashboard';
				return;
			}

			if (!user) return;
            let dataToSetToDb;
            const docRef = doc(db,'users',user.uid);
            const docSnap = await getDoc(docRef);
			if(!docSnap.data()) {
                dataToSetToDb = {
                    email:user.email,
                    todo: []
                }
                // await setDoc(docRef, dataToSetToDb)
				await dbHandler.setDoc('users', user.uid, dataToSetToDb);
            }
            else {
                dataToSetToDb = docSnap.data();
            }
            authStore.update(curr => {
                return {
                    ...curr,
                    user,
                    loading:false,
                    data:dataToSetToDb
                }
            });
		});
	});
</script>

<main class="mainContainer">
	<slot />
</main>

<style>
	.mainContainer {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
