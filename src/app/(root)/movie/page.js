import styles from "./page.module.css";
import MediaWrapper from "../../../components/MediaHandlers/MediaWrapper";
import { Suspense } from "react";
import LoadingSkeletons from "../../../components/LoadingSkeletons/LoadingSkeletons";

export default function MoviesPage() {
	return (
		<div className={styles.container} style={{ animation: "fadeIn 0.5s ease-in-out" }}>
			<h2>Movies List</h2>
			<Suspense fallback={<LoadingSkeletons />}>
				<MediaWrapper mediaMode={"movie"} />
			</Suspense>
		</div>
	);
}

// import { redirect } from "next/navigation"

// export default function Page() {
//   const authenticated = false

//   if (!authenticated) {
//     redirect("/")
//   }

//   return (
//     <div>
//       <p>{"You shouldn't be seeing this page"}</p>
//     </div>
//   )
// }
