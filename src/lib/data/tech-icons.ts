// Game development icons
import unity from '$lib/assets/gamedev/Unity_Technologies_logo.svg';
import godot from '$lib/assets/gamedev/Godot Game engine logo.svg';

// Frontend icons
import svelte from '$lib/assets/frontend/favicon.svg';
import tailwind from '$lib/assets/frontend/tailwindcss-mark.d52e9897.svg';
import flet from '$lib/assets/frontend/logo.svg';
import qt from '$lib/assets/frontend/Qt_logo_2016.svg';

// Backend icons
import sqlite from '$lib/assets/backend/SQLite.svg';

// DevOps icons
import ubuntu from '$lib/assets/devops/UbuntuCoF.svg';
import podman from '$lib/assets/devops/Podman-logo-orig.png';
import git from '$lib/assets/devops/git.svg';
import github from '$lib/assets/devops/github-mark-white.svg';

// Language icons
import c from '$lib/assets/langs/c.svg';
import cpp from '$lib/assets/langs/cpp.svg';
import csharp from '$lib/assets/langs/csharp.svg';
import rust from '$lib/assets/langs/rust.svg';
import python from '$lib/assets/langs/python.svg';
import js from '$lib/assets/langs/javascript.svg';
import ts from '$lib/assets/langs/typescript.svg';

export const gameDevIcons = [
	{ src: unity, className: 'icon-unity' },
	{ src: godot, className: '' }
];

export const frontendIcons = [
	{ src: svelte, className: '' },
	{ src: tailwind, className: '' },
	{ src: flet, className: '' },
	{ src: qt, className: '' }
];

export const backendIcons = [{ src: sqlite, className: '' }];

export const devopsIcons = [
	{ src: ubuntu, className: '' },
	{ src: podman, className: '' },
	{ src: git, className: '' },
	{ src: github, className: 'icon-github' }
];

export const languageIcons = [
	{ src: c, className: '' },
	{ src: cpp, className: '' },
	{ src: csharp, className: '' },
	{ src: rust, className: 'icon-rust' },
	{ src: python, className: '' },
	{ src: js, className: '' },
	{ src: ts, className: '' }
];
