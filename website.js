const defaultExperience = [
	{ role: 'Student developer', company: 'Open to opportunities', period: '2023 - present', description: 'Building skills through academic work, personal projects, and practical experiments with connected technology.' }
];

const templateData = {
	name: 'Rahul Marandi',
	role: 'B.Tech CSE-IoT student & technology enthusiast',
	bio: 'I am Rahul Marandi, a B.Tech student specializing in Computer Science and Engineering with Internet of Things at Meghnad Saha Institute of Technology, Kolkata. Session: 2023-27. I enjoy building practical technology projects and learning how connected systems can solve real problems.',
	location: 'Kolkata, India', address: 'Kolkata, India', phone: '', email: '', github: 'https://github.com/Rahul1mardi', linkedin: '', facebook: '',
	secondarySchool: 'Your secondary school name', secondaryMarks: '', higherSecondarySchool: 'Your higher secondary school name', higherSecondaryMarks: '', college: 'Meghnad Saha Institute of Technology, Kolkata', cgpa: '', session: '2023-27',
	skills: 'C, C++, Python, JavaScript, IoT, HTML, CSS', experience: defaultExperience, accent: '#dd5c38'
};

const saved = JSON.parse(localStorage.getItem('folioforge-data-rahul-v3') || 'null');
const data = Object.assign(structuredClone(templateData), saved || {});
data.experience = saved?.experience || structuredClone(defaultExperience);
const form = document.querySelector('#portfolio-form');
const experienceFields = document.querySelector('#experience-fields');
const preview = document.querySelector('#portfolio-preview');

function escapeHtml(value) {
	return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

function profileUrl(value) {
	const url = String(value || '').trim();
	if (!url) return '';
	return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function renderExperienceFields() {
	experienceFields.innerHTML = data.experience.map((item, index) => `
		<div class="experience-editor">
			<header><span class="project-number">EXPERIENCE ${String(index + 1).padStart(2, '0')}</span>${data.experience.length > 1 ? `<button class="icon-button remove-experience" type="button" data-index="${index}" aria-label="Remove experience">&times;</button>` : ''}</header>
			<div class="field"><label>Role</label><input data-experience="role" data-index="${index}" value="${escapeHtml(item.role)}"></div>
			<div class="field"><label>Company / organization</label><input data-experience="company" data-index="${index}" value="${escapeHtml(item.company)}"></div>
			<div class="field"><label>Period</label><input data-experience="period" data-index="${index}" value="${escapeHtml(item.period)}"></div>
			<div class="field"><label>Description</label><textarea data-experience="description" data-index="${index}">${escapeHtml(item.description)}</textarea></div>
		</div>`).join('');
}

function renderHero() {
	const words = data.role.trim().split(/\s+/);
	const contactItems = [data.address, data.phone, data.email ? `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>` : ''].filter(Boolean).map(item => `<span>${item}</span>`).join('');
	const profiles = [['GitHub', data.github], ['LinkedIn', data.linkedin], ['Facebook', data.facebook]].filter(([, url]) => url).map(([label, url]) => `<a href="${escapeHtml(profileUrl(url))}" target="_blank" rel="noreferrer">${label}</a>`).join('');
	return `<nav class="portfolio-nav"><span class="nav-name">${escapeHtml(data.name)}</span><span class="nav-link">Available for select projects</span></nav>
		<header class="hero"><div><span class="eyebrow">Hello, I am ${escapeHtml(data.name.split(' ')[0])}</span><h2>${escapeHtml(words.slice(0, -1).join(' '))} <em>${escapeHtml(words.at(-1) || '')}</em></h2><p class="hero-copy">${escapeHtml(data.bio)}</p><div class="hero-contact">${contactItems}</div><div class="profile-links">${profiles}</div></div><div class="portrait">${escapeHtml((data.name[0] || 'A').toUpperCase())}</div></header>`;
}

function renderAbout() {
	const email = `<div class="context-detail"><span class="context-detail-label">Email</span><span class="context-detail-value">${data.email ? `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>` : 'Add your email'}</span></div>`;
	return `<section class="portfolio-section context-section"><h3>About me</h3><div class="context-hero"><p class="context-lead">${escapeHtml(data.bio)}</p><div class="context-details"><div class="context-detail"><span class="context-detail-label">Location</span><span class="context-detail-value">${escapeHtml(data.location)}</span></div><div class="context-detail"><span class="context-detail-label">Address</span><span class="context-detail-value">${escapeHtml(data.address)}</span></div>${email}</div></div></section>`;
}

function renderEducation() {
	const secondaryResult = data.secondaryMarks ? `Marks: ${escapeHtml(data.secondaryMarks)}` : 'Add your marks';
	const higherSecondaryResult = data.higherSecondaryMarks ? `Marks: ${escapeHtml(data.higherSecondaryMarks)}` : 'Add your marks';
	const collegeResult = data.cgpa ? `CGPA: ${escapeHtml(data.cgpa)}` : 'Add your CGPA';
	return `<section class="portfolio-section"><h3>Education</h3><div class="education-list"><div class="education-item"><div class="education-year">Secondary</div><div><h4>${escapeHtml(data.secondarySchool)}</h4><p>${secondaryResult}</p></div></div><div class="education-item"><div class="education-year">Higher secondary</div><div><h4>${escapeHtml(data.higherSecondarySchool)}</h4><p>${higherSecondaryResult}</p></div></div><div class="education-item"><div class="education-year">${escapeHtml(data.session)}</div><div><h4>${escapeHtml(data.college)}</h4><p>B.Tech Computer Science &amp; Engineering - Internet of Things · ${collegeResult}</p></div></div></div></section>`;
}

function renderResume() {
	const skills = data.skills.split(',').map(skill => skill.trim()).filter(Boolean).map(skill => `<span class="skill-chip">${escapeHtml(skill)}</span>`).join('');
	const experience = data.experience.map(item => `<div class="resume-item"><div class="resume-period">${escapeHtml(item.period)}</div><div><h4>${escapeHtml(item.role)} · ${escapeHtml(item.company)}</h4><p>${escapeHtml(item.description)}</p></div></div>`).join('');
	return `<section class="portfolio-section"><h3>Skills</h3><div class="skills-list">${skills || '<span class="facts">Add your skills</span>'}</div></section><section class="portfolio-section"><h3>Work experience</h3><div class="resume-list">${experience || '<p class="facts">Add your experience</p>'}</div></section>`;
}

function renderFooter() {
	return `<footer class="portfolio-footer"><span>${escapeHtml(data.name)}</span><span>Let us make something useful.</span></footer>`;
}

function renderPreview() {
	document.documentElement.style.setProperty('--accent', data.accent);
	document.documentElement.style.setProperty('--accent-soft', `${data.accent}22`);
	preview.innerHTML = renderHero() + renderAbout() + renderEducation() + renderResume() + renderFooter();
	localStorage.setItem('folioforge-data-rahul-v3', JSON.stringify(data));
}

form.querySelectorAll('[data-key]').forEach(input => {
	input.value = data[input.dataset.key] || input.value;
	input.addEventListener('input', event => { data[event.target.dataset.key] = event.target.value; renderPreview(); });
});
renderExperienceFields();
renderPreview();
experienceFields.addEventListener('input', event => {
	if (!event.target.dataset.experience) return;
	data.experience[Number(event.target.dataset.index)][event.target.dataset.experience] = event.target.value;
	renderPreview();
});
experienceFields.addEventListener('click', event => {
	if (!event.target.classList.contains('remove-experience')) return;
	data.experience.splice(Number(event.target.dataset.index), 1);
	renderExperienceFields(); renderPreview();
});
document.querySelector('#add-experience').addEventListener('click', () => {
	data.experience.push({ role: 'New role', company: 'Company or organization', period: 'Year - year', description: 'Describe your responsibilities and impact.' });
	renderExperienceFields(); renderPreview();
});
document.querySelector('#reset').addEventListener('click', () => {
	Object.assign(data, structuredClone(templateData));
	form.querySelectorAll('[data-key]').forEach(input => { input.value = data[input.dataset.key] || ''; });
	renderExperienceFields(); renderPreview();
});

document.querySelector('#download').addEventListener('click', () => {
	const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(data.name)} - Portfolio Website</title><link rel="stylesheet" href="styles.css"></head><body><main class="preview-wrap"><article class="portfolio">${preview.innerHTML}</article></main></body></html>`;
	const blob = new Blob([html], { type: 'text/html' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = `${(data.name || 'my-portfolio').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html`;
	link.click();
	URL.revokeObjectURL(link.href);
});
