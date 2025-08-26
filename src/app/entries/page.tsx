import Accordion from './Accordion';
import Dialog from './Dialog';
import { getBrowseEntries } from '@/lib/transcriptions';

export const metadata = {
	title: 'Entries - Kohlibri',
	description:
		'Kohlibri is a search engine for Signalis. This is a fan made website to search through memories in Signalis. ',
};

export default function Page() {
	const chapters = getBrowseEntries();
	return (
		<>
			<div className="fly-right-fade relative mb-2 mt-4 flex sm:mb-4 sm:mt-4">
				<h1 className="text-3xl font-semibold sm:text-4xl">Entries</h1>
				<Dialog />
			</div>
			{chapters.map((chapter, chapterNum) => {
				return (
					<section key={chapter.chapter} className="mb-4 w-full text-center">
						<h2 className="fly-right-fade mb-2 text-xl font-semibold sm:text-2xl" style={{ animationDelay: '100ms' }}>
							{`Chapter ${chapterNum + 1}: ${chapter.chapter}`}
						</h2>
						<ul className="w-full max-w-xl mx-auto text-left leading-[1.5rem]">
							{chapter.parts.map((part, i) => {
								return <Accordion key={part.title} part={part.title} entries={part.entries} index={i} />;
							})}
						</ul>
					</section>
				);
			})}
		</>
	);
}
