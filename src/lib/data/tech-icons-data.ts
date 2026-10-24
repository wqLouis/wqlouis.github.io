// Game development icons
import unity from '$lib/assets/gamedev/unity-logo.svg';
import godot from '$lib/assets/gamedev/godot-logo.svg';
import wgpu from '$lib/assets/backend/wgpu-logo.png';

// Frontend icons
import svelte from '$lib/assets/frontend/favicon.svg';
import tailwind from '$lib/assets/frontend/tailwindcss-mark.d52e9897.svg';
import flet from '$lib/assets/frontend/logo.svg';
import qt from '$lib/assets/frontend/qt-logo.svg';
import iced from '$lib/assets/frontend/iced-logo.svg';

// Backend icons
import sqlite from '$lib/assets/backend/SQLite.svg';
import supabase from '$lib/assets/backend/supabase-logo-icon.svg';

// DevOps icons
import ubuntu from '$lib/assets/devops/ubuntu-cof.svg';
import podman from '$lib/assets/devops/Podman-logo-orig.png';
import git from '$lib/assets/devops/git.svg';
import github from '$lib/assets/devops/github-mark.svg';

// Language icons
import c from '$lib/assets/langs/c.svg';
import cpp from '$lib/assets/langs/cpp.svg';
import csharp from '$lib/assets/langs/csharp.svg';
import rust from '$lib/assets/langs/rust.svg';
import python from '$lib/assets/langs/python.svg';
import js from '$lib/assets/langs/javascript.svg';
import ts from '$lib/assets/langs/typescript.svg';

/** every icon carries a human readable name — the graph itself only shows
 *  pictures, so this is what screen readers get instead */
export interface TechIcon {
	/** the picture */
	src: string;
	/** extra classes for the picture */
	className: string;
	/** the name of the technology, in plain text */
	label: string;
}

export const gameDevIcons: TechIcon[] = [
	{ src: wgpu, className: '', label: 'wgpu' },
	{ src: unity, className: 'icon-unity', label: 'Unity' },
	{ src: godot, className: '', label: 'Godot' }
];

export const frontendIcons: TechIcon[] = [
	{ src: svelte, className: '', label: 'Svelte' },
	{ src: tailwind, className: '', label: 'Tailwind CSS' },
	{ src: flet, className: '', label: 'Flet' },
	{ src: qt, className: '', label: 'Qt' },
	{ src: iced, className: '', label: 'Iced' }
];

export const backendIcons: TechIcon[] = [
	{ src: supabase, className: '', label: 'Supabase' },
	{ src: sqlite, className: '', label: 'SQLite' }
];

export const devopsIcons: TechIcon[] = [
	{ src: ubuntu, className: '', label: 'Ubuntu' },
	{ src: podman, className: '', label: 'Podman' },
	{ src: git, className: '', label: 'Git' },
	{ src: github, className: 'icon-github', label: 'GitHub' }
];

export const languageIcons: TechIcon[] = [
	{ src: c, className: '', label: 'C' },
	{ src: cpp, className: '', label: 'C++' },
	{ src: csharp, className: '', label: 'C#' },
	{ src: rust, className: 'icon-rust', label: 'Rust' },
	{ src: python, className: '', label: 'Python' },
	{ src: js, className: '', label: 'JavaScript' },
	{ src: ts, className: '', label: 'TypeScript' }
];
