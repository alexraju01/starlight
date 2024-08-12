"use client";

import getUpcoming from "@/utils/serverActions/getUpcoming";
import { Suspense, useEffect, useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import { useInView } from "react-intersection-observer";
import styles from "./Upcoming.module.css";

export default function Upcoming() {
	const [tvs, setTvs] = useState([]);
	const [page, setPage] = useState(1);
	const [ref, inView] = useInView();

	useEffect(() => {
		if (inView) {
			loadMoreMovies();
		}
	}, [inView]);

	const loadMoreMovies = async () => {
		const tvList = await getUpcoming("tv", page + 1);
		setTvs([...tvs, ...tvList]);
		// setTvs((prevTvs) => [...prevTvs, ...tvList]);
		setPage(page + 1);
	};

	return (
		<div>
			<Suspense fallback={<div>Loading. . .</div>}>
				<div className={styles.container}>
					{tvs.map(
						(tv) =>
							tv.poster_path && (
								<div key={tv.id}>
									<MediaCard key={tv.id} media={tv} mediaMode={"tv"} />
									{tv.name} - {tv.first_air_date}
								</div>
							)

						// <p key={tv.id}>
						// </p>
					)}
				</div>
			</Suspense>
			<div ref={ref}>Loading more tvs. . .</div>
		</div>
	);
}
