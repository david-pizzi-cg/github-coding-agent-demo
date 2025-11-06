// World Clock - GitHub Coding Agent Demo JavaScript
class WorldClock {
    constructor() {
        this.currentTimezone = 'auto';
        this.updateInterval = null;
        this.init();
    }

    async init() {
        console.log('🌍 World Clock initializing...');
        await this.loadTime();
        this.startAutoUpdate();
    }

    async loadTime(timezone = 'auto') {
        try {
            this.showLoading();
            
            if (timezone === 'auto') {
                // Use local time when auto is selected
                this.displayLocalTime();
            } else {
                // For specific timezones, we'll simulate the data
                this.displayTimezoneTime(timezone);
            }
            
        } catch (error) {
            console.error('Error fetching time:', error);
            this.showError();
        }
    }

    displayLocalTime() {
        const now = new Date();
        
        // Create a mock data object similar to WorldTimeAPI
        const data = {
            datetime: now.toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            day_of_year: this.getDayOfYear(now),
            week_number: this.getWeekNumber(now),
            utc_offset: this.getUTCOffset(now)
        };
        
        this.displayTime(data);
        this.currentTimezone = data.timezone;
    }

    displayTimezoneTime(timezone) {
        try {
            const now = new Date();
            
            // Create date in specified timezone
            const timeInZone = new Date(now.toLocaleString("en-US", {timeZone: timezone}));
            
            const data = {
                datetime: timeInZone.toISOString(),
                timezone: timezone,
                day_of_year: this.getDayOfYear(timeInZone),
                week_number: this.getWeekNumber(timeInZone),
                utc_offset: this.getTimezoneOffset(timezone)
            };
            
            this.displayTime(data);
            this.currentTimezone = timezone;
        } catch (error) {
            console.error('Invalid timezone:', error);
            this.showError();
        }
    }

    displayTime(data) {
        const datetime = new Date(data.datetime);
        
        // Format time (24-hour format)
        const timeString = datetime.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Format date
        const dateString = datetime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Update DOM elements
        document.getElementById('current-time').textContent = timeString;
        document.getElementById('current-date').textContent = dateString;
        document.getElementById('timezone').textContent = data.timezone.replace('_', ' ');
        document.getElementById('location').textContent = `📍 ${this.getLocationFromTimezone(data.timezone)}`;
        
        // Additional info
        document.getElementById('day-of-year').textContent = data.day_of_year;
        document.getElementById('week-number').textContent = data.week_number;
        document.getElementById('utc-offset').textContent = data.utc_offset;
        document.getElementById('day-night').textContent = this.getDayNightIndicator(datetime);
        
        // Remove loading state
        this.hideLoading();
        
        console.log('✅ Time updated successfully');
    }

    getLocationFromTimezone(timezone) {
        const locationMap = {
            'America/New_York': 'New York, USA',
            'America/Los_Angeles': 'Los Angeles, USA',
            'Europe/London': 'London, UK',
            'Europe/Paris': 'Paris, France',
            'Asia/Tokyo': 'Tokyo, Japan',
            'Australia/Sydney': 'Sydney, Australia'
        };
        
        return locationMap[timezone] || timezone.split('/').pop().replace('_', ' ');
    }

    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
    }

    getUTCOffset(date) {
        const offsetMinutes = date.getTimezoneOffset();
        const hours = Math.round(Math.abs(offsetMinutes) / 60);
        const sign = offsetMinutes <= 0 ? '+' : '-';
        return `GMT${sign}${hours}`;
    }

    getTimezoneOffset(timezone) {
        try {
            const now = new Date();
            const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
            const targetTime = new Date(utc.toLocaleString("en-US", {timeZone: timezone}));
            const offsetMinutes = (targetTime.getTime() - utc.getTime()) / 60000;
            const hours = Math.round(Math.abs(offsetMinutes) / 60);
            const sign = offsetMinutes >= 0 ? '+' : '-';
            return `GMT${sign}${hours}`;
        } catch (error) {
            return 'GMT+0';
        }
    }

    getDayNightIndicator(date) {
        const hour = date.getHours();
        
        if (hour >= 6 && hour < 12) {
            return '🌅 Morning';
        } else if (hour >= 12 && hour < 18) {
            return '☀️ Day';
        } else if (hour >= 18 && hour < 21) {
            return '🌅 Evening';
        } else {
            return '🌙 Night';
        }
    }

    showLoading() {
        const elements = ['current-time', 'current-date', 'timezone', 'location'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('loading');
            }
        });
    }

    hideLoading() {
        const elements = ['current-time', 'current-date', 'timezone', 'location'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('loading');
            }
        });
    }

    showError() {
        document.getElementById('current-time').textContent = 'Error';
        document.getElementById('current-date').textContent = 'Unable to fetch time';
        document.getElementById('timezone').textContent = 'Connection failed';
        document.getElementById('location').textContent = '❌ Error loading location';
        
        document.getElementById('day-of-year').textContent = '---';
        document.getElementById('week-number').textContent = '---';
        document.getElementById('utc-offset').textContent = '---';
        document.getElementById('day-night').textContent = '---';
        
        this.hideLoading();
    }

    startAutoUpdate() {
        // Update every 30 seconds
        this.updateInterval = setInterval(() => {
            this.loadTime(this.currentTimezone);
        }, 30000);
    }

    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    async refresh() {
        console.log('🔄 Refreshing time...');
        this.stopAutoUpdate();
        await this.loadTime(this.currentTimezone);
        this.startAutoUpdate();
    }

    async changeTimezone(timezone) {
        console.log(`🌍 Changing timezone to: ${timezone}`);
        this.stopAutoUpdate();
        await this.loadTime(timezone);
        this.startAutoUpdate();
    }
}

// Initialize the world clock
let worldClock;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 World Clock Demo loaded');
    worldClock = new WorldClock();
});

// Global functions for button interactions
function refreshTime() {
    if (worldClock) {
        worldClock.refresh();
    }
}

function changeTimezone() {
    const selector = document.getElementById('timezone-selector');
    const selectedTimezone = selector.value;
    
    if (worldClock) {
        worldClock.changeTimezone(selectedTimezone);
    }
}

// Handle visibility change to pause/resume updates when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (worldClock) {
        if (document.hidden) {
            worldClock.stopAutoUpdate();
            console.log('⏸️ Auto-update paused (tab hidden)');
        } else {
            worldClock.startAutoUpdate();
            console.log('▶️ Auto-update resumed (tab visible)');
        }
    }
});

// Add some fun console messages
console.log(`
🌍 World Clock Demo
━━━━━━━━━━━━━━━━━━━━
✨ Beautiful time display
🔄 Auto-refresh every 30s
🌐 Multiple timezone support
📡 Powered by GitHub Coding Agent

Perfect for GitHub Coding Agent demos!
`);

// Export for potential future use
window.WorldClock = WorldClock;