import Link from 'next/link';
import Poem from './Poem';

export default async function Page() {
	return (
		<>
			<h2 className="mt-2 font-light text-sm text-white/80 text-center">
				-- This site has been updated for version 1.2 of Signalis --
			</h2>
			<h1 className="fly-right-fade mb-2 mt-6 text-3xl font-semibold sm:mb-4 sm:mt-16 sm:text-4xl">Welcome</h1>
			<p className="fly-right-fade leading-[1.5rem] mb-4 text-base sm:text-norm max-w-2xl" style={{ animationDelay: '50ms' }}>
				This is an unofficial, fan-made site for searching memories in the game:{' '}
				<strong>
					<a
						className="text-primary-blue hover:underline hover:text-primary-blue-hover"
						href="https://store.steampowered.com/app/1262350/SIGNALIS/"
					>
						Signalis
					</a>
				</strong>
				. I hope that this will help players dig into the lore and discuss it more easily with each other.
			</p>
			<Link
				href="/entries"
				style={{ animationDelay: '100ms' }}
				className="fly-right-fade bg-primary-orange mb-12 px-4 py-1 text-center text-base font-medium hover:bg-off-white hover:text-black sm:text-norm sm:px-8 sm:py-2"
			>
				Browse Entries
			</Link>
			<Poem />
		</>
	);
}
