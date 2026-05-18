function setText(selector, value) {
    if (typeof value === 'undefined' || value === null) {
        return;
    }

    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
    }
}

function setHref(selector, value) {
    if (!value) {
        return;
    }

    const element = document.querySelector(selector);
    if (element) {
        element.setAttribute('href', value);
    }
}

function applyCardText(selector, items) {
    if (!Array.isArray(items)) {
        return;
    }

    const cards = document.querySelectorAll(selector);
    items.forEach((item, index) => {
        const card = cards[index];
        if (!card) {
            return;
        }

        const titleEl = card.querySelector('h4, h1, span, strong');
        const textEl = card.querySelector('p');
        const buttonEl = card.querySelector('button');
        const linkEl = card.querySelector('a');

        if (titleEl && item.title) {
            titleEl.textContent = item.title;
        }

        if (textEl && item.text) {
            textEl.textContent = item.text;
        }

        if (buttonEl && item.buttonText) {
            buttonEl.textContent = item.buttonText;
        }

        if (linkEl && item.url) {
            linkEl.setAttribute('href', item.url);
        }
    });
}

function applyStatCards(items) {
    if (!Array.isArray(items)) {
        return;
    }

    const cards = document.querySelectorAll('.hero-mini-stats .mini-card');
    items.forEach((item, index) => {
        const card = cards[index];
        if (!card) {
            return;
        }

        const label = card.querySelector('span');
        const value = card.querySelector('strong');

        if (label && item.label) {
            label.textContent = item.label;
        }

        if (value && item.value) {
            value.textContent = item.value;
        }
    });
}

function applyPanelItems(items) {
    if (!Array.isArray(items)) {
        return;
    }

    const panelItems = document.querySelectorAll('.panel-grid .panel-item');
    items.forEach((item, index) => {
        const panelItem = panelItems[index];
        if (!panelItem) {
            return;
        }

        const numberEl = panelItem.querySelector('span');
        const textEl = panelItem.querySelector('p');

        if (numberEl && item.number) {
            numberEl.textContent = item.number;
        }

        if (textEl && item.text) {
            textEl.textContent = item.text;
        }
    });
}

function applyStatusFeatures(items) {
    if (!Array.isArray(items)) {
        return;
    }

    const features = document.querySelectorAll('.status-feature-list .status-feature');
    items.forEach((item, index) => {
        const feature = features[index];
        if (!feature) {
            return;
        }

        const labelEl = feature.querySelector('span');
        const textEl = feature.querySelector('p');

        if (labelEl && item.label) {
            labelEl.textContent = item.label;
        }

        if (textEl && item.text) {
            textEl.textContent = item.text;
        }
    });
}

function applyHowToPlaySteps(items) {
    if (!Array.isArray(items)) {
        return;
    }

    const list = document.querySelector('#howtoplay-steps-list');
    if (!list) {
        return;
    }

    list.innerHTML = '';
    items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

function applyHostButtons(items) {
    if (!Array.isArray(items)) {
        return;
    }

    const hostList = document.querySelector('#host-links-list');
    if (!hostList) {
        return;
    }

    hostList.innerHTML = '';
    items.forEach((item) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'host-copy-button';
        button.textContent = item.label || 'Copy Host';
        button.dataset.copyLabel = item.label || 'Copy Host';
        button.dataset.copyValue = item.value || '';
        hostList.appendChild(button);
    });
}

function formatStatusMessage(template, label) {
    if (!template) {
        return label || '';
    }

    return template.replace('{label}', label || '');
}

async function copyTextToClipboard(value) {
    if (!value) {
        return false;
    }

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(value);
            return true;
        }

        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(textarea);
        return copied;
    } catch (error) {
        return false;
    }
}

function initializeHostCopyActions(hostLinksConfig) {
    const buttons = document.querySelectorAll('#host-links-list .host-copy-button');
    const statusEl = document.querySelector('#host-copy-status');

    if (!buttons.length || !statusEl) {
        return;
    }

    buttons.forEach((button) => {
        button.addEventListener('click', async () => {
            const label = button.dataset.copyLabel || button.textContent || 'Host';
            const value = button.dataset.copyValue || '';

            if (!value) {
                statusEl.textContent = formatStatusMessage(hostLinksConfig && hostLinksConfig.emptyStatus, label);
                buttons.forEach((item) => item.classList.remove('copied'));
                return;
            }

            const copied = await copyTextToClipboard(value);
            if (copied) {
                statusEl.textContent = formatStatusMessage(hostLinksConfig && hostLinksConfig.copiedStatus, label);
                buttons.forEach((item) => item.classList.remove('copied'));
                button.classList.add('copied');
                return;
            }

            const fallbackMessage = hostLinksConfig && hostLinksConfig.fallbackStatus
                ? hostLinksConfig.fallbackStatus
                : 'Failed to copy automatically.';
            statusEl.textContent = `${fallbackMessage} ${value}`;
            buttons.forEach((item) => item.classList.remove('copied'));
        });
    });
}

function applyAboutItems(items) {
    if (!Array.isArray(items)) {
        return;
    }

    const blocks = document.querySelectorAll('.container-about2-content .content-icon');
    items.forEach((item, index) => {
        const block = blocks[index];
        if (!block) {
            return;
        }

        const titleEl = block.querySelector('h1');
        const textEl = block.querySelector('p');

        if (titleEl && item.title) {
            titleEl.innerHTML = item.title;
        }

        if (textEl && item.text) {
            textEl.textContent = item.text;
        }
    });
}

function applyReviews(items) {
    if (!Array.isArray(items)) {
        return;
    }

    const slides = document.querySelectorAll('swiper-slide');
    items.forEach((item, index) => {
        const slide = slides[index];
        if (slide) {
            slide.textContent = item;
        }
    });
}

function getSiteConfig() {
    return window.SITE_CONFIG || null;
}

function applyConfig(config) {
    if (!config) {
        return;
    }

    setText('#site-brand', config.site && config.site.brand);
    if (config.site && config.site.title) {
        document.title = config.site.title;
    }

    setText('#nav-home-label', config.navigation && config.navigation.home);
    setText('#nav-status-label', config.navigation && config.navigation.status);
    setText('#nav-how-to-play-label', config.navigation && config.navigation.howToPlay);
    setText('#nav-about-label', config.navigation && config.navigation.about);
    setText('#nav-roles-label', config.navigation && config.navigation.roles);

    setText('#hero-eyebrow', config.hero && config.hero.eyebrow);
    setText('#hero-title', config.hero && config.hero.title);
    setText('#hero-description', config.hero && config.hero.description);
    setText('#hero-primary-text', config.hero && config.hero.primaryButton);
    setText('#hero-secondary-text', config.hero && config.hero.secondaryButton);
    setHref('#hero-primary-link', config.links && config.links.discord);
    setHref('#hero-secondary-link', config.links && config.links.heroSecondary);
    applyStatCards(config.hero && config.hero.stats);

    if (config.hero && config.hero.panel) {
        setText('#hero-panel-tag', config.hero.panel.tag);
        setText('#hero-panel-live-text', config.hero.panel.liveLabel);
        setText('#hero-panel-title', config.hero.panel.title);
        setText('#hero-panel-description', config.hero.panel.description);
        applyPanelItems(config.hero.panel.items);
    }

    if (config.serverStatus) {
        setText('#status-section-label', config.serverStatus.sectionLabel);
        setText('#status-heading', config.serverStatus.heading);
        setText('#status-description', config.serverStatus.description);
        setText('#status-monitor-label', config.serverStatus.monitorLabel);
        setText('#status-server-id-label', config.serverStatus.serverIdLabel);
        setText('#status-server-id-value', config.serverStatus.serverId);
        setText('#status-players-label', config.serverStatus.playersLabel);
        setText('#status-refresh-label', config.serverStatus.refreshLabel);
        setText('#status-refresh-rate', config.serverStatus.refreshValue);
        setText('#status-connection-label', config.serverStatus.connectionLabel);
        setText('#status-connection', config.serverStatus.initialConnection);
        setText('#status-last-update-label', config.serverStatus.lastUpdateLabel);
        setText('#status-response', config.serverStatus.initialMessage);
        applyStatusFeatures(config.serverStatus.features);
    }

    if (config.howToPlay) {
        setText('#howtoplay-section-label', config.howToPlay.sectionLabel);
        setText('#howtoplay-heading', config.howToPlay.heading);
        setText('#howtoplay-description', config.howToPlay.description);
        setText('#howtoplay-steps-title', config.howToPlay.stepsTitle);
        setText('#howtoplay-download-prefix', config.howToPlay.downloadPrefix);
        setText('#howtoplay-download-link', config.howToPlay.downloadText);
        setHref('#howtoplay-download-link', config.howToPlay.downloadUrl);
        applyHowToPlaySteps(config.howToPlay.steps);
    }

    if (config.hostLinks) {
        setText('#host-links-label', config.hostLinks.sectionLabel);
        setText('#host-links-note', config.hostLinks.note);
        setText('#host-copy-status', config.hostLinks.initialStatus);
        applyHostButtons(config.hostLinks.buttons);
        initializeHostCopyActions(config.hostLinks);
    }

    if (config.about) {
        setText('#about-section-label', config.about.sectionLabel);
        setText('#about-title-line-1', config.about.title && config.about.title.line1);
        setText('#about-title-line-2', config.about.title && config.about.title.line2);
        setText('#about-description', config.about.description);
        setText('#about-highlight-label', config.about.highlightLabel);
        setText('#about-highlight-title', config.about.highlightTitle);
        setText('#about-highlight-button', config.about.buttonText);
        setHref('#about-highlight-link', config.links && config.links.aboutHighlight);
        applyCardText('.container-about .card', config.about.cards);
        applyAboutItems(config.about.items);
    }

    if (config.roles) {
        setText('#roles-section-label', config.roles.sectionLabel);
        setText('#roles-title-text', config.roles.title);
        setText('#roles-subtitle', config.roles.subtitle);
        setText('#reviews-title', config.roles.reviewsTitle);

        const roleCards = Array.isArray(config.roles.cards)
            ? config.roles.cards.map((item) => ({
                ...item,
                url: item.url || (config.links && config.links.defaultRoleCta)
            }))
            : [];

        applyCardText('.card-course', roleCards);
        applyReviews(config.roles.reviews);
    }

    if (config.footer) {
        setText('#footer-title', config.footer.title);
        setText('#footer-description', config.footer.description);
        setText('#footer-home-label', config.footer.links && config.footer.links.home);
        setText('#footer-status-label', config.footer.links && config.footer.links.status);
        setText('#footer-howtoplay-label', config.footer.links && config.footer.links.howToPlay);
        setText('#footer-about-label', config.footer.links && config.footer.links.about);
        setText('#footer-roles-label', config.footer.links && config.footer.links.roles);
        setText('#footer-copyright', config.footer.copyright);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const config = getSiteConfig();

    if (!config) {
        console.error('SITE_CONFIG is not defined.');
        return;
    }

    applyConfig(config);
});
