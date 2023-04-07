<script>
	import { onMount } from 'svelte';
	import { auth, db } from '$lib/firebase/firebase';
    import {connectFirestoreEmulator, doc, getDoc, setDoc} from 'firebase/firestore';
	import {authStore} from '../stores/store'
    // const nonAuthRoutes = ['/'];
	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;
			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
                return
			}
			if (user && currentPath === '/') {
				window.location.href = '/dashboard';
                return
			}

			if (!user) return;

            let dataToSetToDb;
            let docSnap;
            try {
                docSnap = await getDoc(db, docRef);
            } catch (error) {
                console.log(error)
            }
            const docRef = doc(db,'users',user.uid);
            if(!docSnap) {
                const userRef = doc(db, 'user', user.uid);
                dataToSetToDb = {
                    email:user.email,
                    todo: []
                }
                await setDoc(userRef, dataToSetToDb)
            }
            else {
                dataToSetToDb = docSnap.data;
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
