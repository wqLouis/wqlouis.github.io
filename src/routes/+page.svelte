<script lang="ts">
	import { smooth_scroll } from '../lib/smooth_scroll.ts';
	import Hldiv from '$lib/Hldiv.svelte';
	import cIcon from '$lib/assets/c.svg';
	import cppIcon from '$lib/assets/cpp.svg';
	import csharpIcon from '$lib/assets/csharp.svg';
	import pythonIcon from '$lib/assets/python.svg';
	import rustIcon from '$lib/assets/rust.svg';
	import jsIcon from '$lib/assets/javascript.svg';
	import tsIcon from '$lib/assets/typescript.svg';
	import gitIcon from '$lib/assets/git.svg';
	import zedIcon from '$lib/assets/zed.svg';
	import fishIcon from '$lib/assets/fish.svg';
	import firefoxIcon from '$lib/assets/firefox.svg';
	import helixIcon from '$lib/assets/helix.svg';
	import ghosttyIcon from '$lib/assets/com.mitchellh.ghostty.svg';
	import { snap_card } from '$lib/snap_card.ts';

	smooth_scroll();
</script>

<main class="h-auto">
	<section></section>
	<div class="bg-grid pt-[40vh] pb-[45vh] [text-shadow:0_0_24px] text-shadow-slate-100">
		<h1 class="text-center text-4xl font-bold sm:text-6xl">This is wqLouis</h1>
		<h2 class="text-1xl text-center">
			<address><a href="mailto:wql-louis@outlook.com">wql-louis@outlook.com</a></address>
		</h2>
	</div>
	<section></section>
	<div class="h-px w-full bg-gray-700"></div>
	<div class="flex h-screen border-r border-gray-700">
		<div class="bg-diagonal h-full w-[15vw] border-r border-gray-700"></div>
		<div
			class="h-3xl mx-auto grid h-[60vw] w-[60vw] grid-cols-3 grid-rows-3 gap-2 p-8 sm:h-[80vh] sm:w-[80vh] sm:gap-6 [&>div]:transition-transform [&>div]:hover:z-1 [&>div]:hover:scale-110"
		>
			<div class="col-span-1 col-start-1 row-span-3">
				<Hldiv
					className="rounded-xl p-4 hover:[&>#circle]:border-gray-500 [&>#circle>div]:transition-all hover:[&>#circle>div]:brightness-100 hover:[&>#circle>div]:drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]"
				>
					<div class="text-2xl font-black">Tools</div>
					<div class="h-10"></div>
					<div
						class="absolute right-16 size-160 rounded-full border border-dashed border-gray-700 transition-all"
						id="circle"
					>
						<div
							class="absolute top-80 left-80 size-24 origin-[0_-272px] translate-y-80 rotate-(--rotate) overflow-visible brightness-50"
							style="--rotate: 265deg;"
						>
							<img
								src={firefoxIcon}
								alt=""
								class="absolute -top-12 -left-24 size-24 rotate-(--rotate)"
								style="--rotate: 95deg;"
							/>
						</div>
						<div
							class="absolute top-80 left-80 size-24 origin-[0_-272px] translate-y-80 rotate-(--rotate) overflow-visible brightness-50"
							style="--rotate: 292deg;"
						>
							<img
								src={zedIcon}
								alt=""
								class="absolute -top-12 -left-24 size-24 scale-90 rotate-(--rotate)"
								style="--rotate: 68deg;"
							/>
						</div>
						<div
							class="absolute top-80 left-80 size-24 origin-[0_-272px] translate-y-80 rotate-(--rotate) overflow-visible brightness-50"
							style="--rotate: 235deg;"
						>
							<img
								src={ghosttyIcon}
								alt=""
								class="absolute -top-12 -left-24 size-24 scale-90 rotate-(--rotate)"
								style="--rotate: 125deg;"
							/>
						</div>
						<div
							class="absolute top-80 left-80 size-24 origin-[0_-272px] translate-y-80 rotate-(--rotate) overflow-visible brightness-50"
							style="--rotate: 210deg;"
						>
							<img
								src={fishIcon}
								alt=""
								class="absolute -top-12 -left-24 size-24 scale-77 rotate-(--rotate)"
								style="--rotate: 150deg;"
							/>
						</div>
						<div
							class="absolute top-80 left-80 size-24 origin-[0_-272px] translate-y-80 rotate-(--rotate) overflow-visible brightness-50"
							style="--rotate: 315deg;"
						>
							<img
								src={helixIcon}
								alt=""
								class="absolute -top-12 -left-24 size-24 scale-70 rotate-(--rotate)"
								style="--rotate: 45deg;"
							/>
						</div>
					</div>
				</Hldiv>
			</div>
			<div class="col-span-2">
				<Hldiv className="rounded-xl p-4">
					<div class="text-2xl font-black">Tech Stack</div>
				</Hldiv>
			</div>
			<div class="col-span-1 row-span-1 flex">
				<img
					use:snap_card
					src="https://avatars.githubusercontent.com/u/114333810?v=4"
					alt=""
					class="mx-auto my-auto size-32 rounded-full drop-shadow-[0_0_8px_black]"
				/>
			</div>
			<div class="col-span-1 row-span-2">
				<Hldiv className="rounded-xl p-4">
					<div class="text-2xl font-black">About Me</div>
				</Hldiv>
			</div>
			<div class="col-span-1 row-span-1">
				<Hldiv className="rounded-xl p-4">
					<div class="text-2xl font-black">OS</div>
				</Hldiv>
			</div>
		</div>
		<div class="bg-diagonal h-full w-[15vw] border-l border-gray-700"></div>
	</div>
</main>
