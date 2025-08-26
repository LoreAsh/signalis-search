'use client';

import { useKeyDown } from '@/hooks';
import { usePagination } from '@/hooks';
import { useState, useRef, useEffect } from 'react';

const leftAngleBracket = '\u003C';
const rightAngleBracket = '\u003E';

type Props = {
	text: { __html: string }[];
	params: { entry: string; page: string };
};

export default function EntryPage({ text, params }: Props) {
	const totalPages = text.length; // one based index

	// page is zero based index
	const { page, next, prev, hasNext, hasPrev } = usePagination(totalPages, Number(params.page) - 1);
	const [direction, setDirection] = useState<'left' | 'right'>('right');
	const ref = useRef<HTMLParagraphElement>(null);
	useKeyDown(keyHandler);

	useEffect(() => {
		history.replaceState(null, '', `/entries/${params.entry}/${page + 1}`);
	}, [page, params.entry]);

	function pageChangeHandler(input: 'prev' | 'next') {
		const directionInput = input === 'prev' ? 'left' : 'right';

		if (!ref?.current) return;
		const canChange = directionInput === 'left' ? hasPrev : hasNext;
		if (!canChange) return;

		directionInput === 'left' ? prev() : next();
		setDirection(directionInput === 'left' ? 'right' : 'left');
	}

	function keyHandler(e: KeyboardEvent) {
		switch (e.code) {
			case 'ArrowLeft':
			case 'KeyA':
				pageChangeHandler('prev');
				break;
			case 'ArrowRight':
			case 'KeyD':
				pageChangeHandler('next');
				break;
		}
	}

	return (
		<>
			<p
				key={page}
				ref={ref}
				className={`${
					direction === 'right' ? 'fly-right-fade' : 'fly-left-fade'
				} mb-12	min-h-52 w-full max-w-204 whitespace-pre-line text-base leading-7 sm:mt-12 sm:text-norm`}
				style={{ animationDelay: '100ms' }}
				dangerouslySetInnerHTML={text[page]}
			></p>

			<div
				className="fly-right-fade flex select-none items-center text-base font-light text-white/80 sm:text-norm"
				style={{ animationDelay: '200ms' }}
			>
				<button className={`px-4 py-1 ${!hasPrev ? 'invisible' : ''}`} onClick={() => pageChangeHandler('prev')}>
					{leftAngleBracket}
				</button>
				{String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
				<button className={`px-4 py-1 ${!hasNext ? 'invisible' : ''}`} onClick={() => pageChangeHandler('next')}>
					{rightAngleBracket}
				</button>
			</div>
		</>
	);
}
