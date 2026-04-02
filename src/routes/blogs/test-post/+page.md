---
title: Testing Blog Styling
description: A test post to verify blog layout styling including code blocks
date: 2026-04-02
layout: blogs
tags: [test, styling, typography, code]
---

# Introduction

This is a test blog post to verify the new styling for basic HTML tags in the blog layout, including syntax highlighting for code blocks, copy buttons, and scroll indicators.

# Headings & Text Formatting

## Headings Hierarchy

### Level 3 Heading

#### Level 4 Heading

##### Level 5 Heading

###### Level 6 Heading

## Paragraphs and Text Formatting

This is a regular paragraph with **bold text** and _italic text_. You can also have **_bold and italic text_**.

Here's another paragraph with `inline code` and a [link to Google](https://google.com). Also testing `inline code with language-javascript class`.

# Lists & Code Examples

## Lists

### Unordered List

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

## Code Blocks with Syntax Highlighting

### JavaScript Example

```javascript
function greet(name) {
	console.log(`Hello, ${name}!`);
	return `Hello, ${name}!`;
}

const user = {
	name: 'John',
	age: 30,
	isAdmin: true
};

// Arrow function example
const add = (a, b) => a + b;

greet('World');
```

### Python Example

```python
def fibonacci(n):
	if n <= 1:
		return n
	return fibonacci(n-1) + fibonacci(n-2)

class Person:
	def __init__(self, name, age):
		self.name = name
		self.age = age

	def greet(self):
		return f"Hello, my name is {self.name}"

print(fibonacci(10))
```

### TypeScript Example

```typescript
interface User {
	id: number;
	name: string;
	email: string;
	isActive: boolean;
}

function createUser(user: User): User {
	return {
		...user,
		isActive: true
	};
}

const newUser: User = createUser({
	id: 1,
	name: 'Alice',
	email: 'alice@example.com',
	isActive: false
});
```

# More Code Examples

## HTML Example

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Test Page</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				margin: 0;
				padding: 20px;
			}

			.container {
				max-width: 800px;
				margin: 0 auto;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h1>Hello World</h1>
			<p>This is a test paragraph.</p>
		</div>
	</body>
</html>
```

## CSS Example

```css
/* Custom CSS variables */
:root {
	--primary-color: #3b82f6;
	--secondary-color: #10b981;
	--text-color: #1f2937;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
}

.button {
	background-color: var(--primary-color);
	color: white;
	padding: 0.75rem 1.5rem;
	border-radius: 0.5rem;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s ease;
}

.button:hover {
	background-color: #2563eb;
}

@media (max-width: 768px) {
	.container {
		padding: 1rem;
	}
}
```

# Additional Content

## JSON Example

```json
{
	"name": "Test Project",
	"version": "1.0.0",
	"description": "A test project for styling",
	"main": "index.js",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"test": "jest"
	},
	"dependencies": {
		"react": "^18.2.0",
		"react-dom": "^18.2.0"
	},
	"devDependencies": {
		"typescript": "^5.0.0",
		"vite": "^4.0.0"
	}
}
```

## Bash/Shell Example

```bash
#!/bin/bash

# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y curl git build-essential

# Clone repository
git clone https://github.com/example/project.git
cd project

# Install Node.js if not present
if ! command -v node &> /dev/null; then
	curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
	sudo apt install -y nodejs
fi

# Install project dependencies
npm install

# Start development server
npm run dev
```

# Blockquotes & Tables

## Blockquotes

> This is a blockquote. It should have a distinct styling with a left border and italic text.
>
> Multiple paragraphs in a blockquote are supported.
>
> `Code inside blockquotes` should also work correctly.

## Horizontal Rule

---

## Table

| Feature          | Status | Notes                    |
| ---------------- | ------ | ------------------------ |
| Headings         | ✅     | All h1-h6 styled         |
| Paragraphs       | ✅     | Proper spacing           |
| Lists            | ✅     | Ordered and unordered    |
| Inline Code      | ✅     | With background          |
| Code Blocks      | ✅     | With syntax highlighting |
| Language Labels  | ✅     | Shows language name      |
| Links            | ✅     | With hover effects       |
| Blockquotes      | ✅     | Distinct styling         |
| Tables           | ✅     | Using Table component    |
| Dark Mode        | ✅     | All colors adjust        |
| Copy Buttons     | ✅     | For code blocks          |
| Scroll Indicator | ✅     | Shows current section    |

# Conclusion

## Images

![Placeholder Image](https://via.placeholder.com/600x400/3b82f6/ffffff?text=Blog+Image)

## Final Thoughts

All basic HTML tags should now have consistent styling within the blog layout without polluting global styles. Code blocks feature:

1. **Syntax highlighting** with custom colors for different token types
2. **Language labels** showing the programming language
3. **Copy buttons** for easy code copying
4. **Dark mode support** with adjusted colors
5. **Responsive design** that works on mobile
6. **Clean container styling** with proper padding and borders

The styling is contained within the `.blog-content` class scope to avoid polluting global styles.
