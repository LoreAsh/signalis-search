import { getEntry } from '@/lib/transcriptions';
import EntryPage from './EntryPage';
import { Metadata } from 'next';
import { tokenize } from '@/lib/tokenize';
import { notFound } from 'next/navigation';
import { memories } from '@/lib/transcriptions/index';

type Props = { params: Promise<{ entry: string; page: string }> };

export const dynamic = 'force-static';

export async function generateStaticParams() {
	// const slugs = getAllEntrySlugs().map((slug) => ({ entry: slug }));
	const entries = memories;
	const slugs: { entry: string; page: string }[] = [];
	entries.forEach((entry) => {
		entry.text.forEach((_, index) => {
			slugs.push({ entry: entry.slug, page: String(index + 1) });
		});
	});

	return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slugs = await params;
	const entry = getEntry(slugs.entry);
	let description = entry ? entry.text[Number(slugs.page) - 1] : '404, page not found';

	const replace = [
		{
			pattern: '#',
			replacement: '',
		},
		{
			pattern: '@',
			replacement: '',
		},
		{
			pattern: '*',
			replacement: '█',
		},
		{
			pattern: '$',
			replacement: '',
		},
	];

	replace.forEach((rule) => {
		description = description.replaceAll(rule.pattern, rule.replacement);
	});
	
	return {
		title: `${entry ? entry.title : '404 - Entry not found'} - Kohlibri`,
		description: description,
	};
}

export default async function Page({ params }: Props) {
	const slugs = await params;
	const entry = getEntry(slugs.entry);

	if (!entry) notFound();

	let formattedText: { __html: string }[] = [];
	entry.text.forEach((entry) => {
		formattedText.push({ __html: tokenize(entry) });
	});

	return (
		<>
			<h1 className="fly-right-fade entry-title relative mb-4 mt-4 w-max max-w-xs sm:max-w-xl text-center text-2xl font-semibold leading-12 sm:mt-20 sm:text-[2.5rem]">
				{entry.title}
			</h1>
			<EntryPage text={formattedText} params={slugs} />
		</>
	);
}
