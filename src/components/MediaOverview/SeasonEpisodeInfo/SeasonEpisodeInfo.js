import styles from "./SeasonEpisodeInfo.module.css";

export default function SeasonEpisodeInfo({ metaData }) {
	const { number_of_seasons, number_of_episodes } = metaData;
	return (
		<section className={styles.container}>
			{number_of_seasons && number_of_episodes && (
				<div className={styles.mediaMetadata}>
					<div>{`${number_of_seasons} Seasons`}</div>
					<div>{`${number_of_episodes} Episodes`}</div>
				</div>
			)}
		</section>
	);
}
