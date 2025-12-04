// SMART CITY DATASET 
const SAMPLE_SPOTS = {
    Nature: [
        { name: 'City Botanical Garden', time: 'Morning', note: 'Relaxing walk among flowers' },
        { name: 'Riverside Park', time: 'Evening', note: 'Beautiful sunset view' },
        { name: 'Butterfly Sanctuary', time: 'Afternoon', note: 'Rare species photography' },
        { name: 'Lotus Lake', time: 'Morning', note: 'Boating and peace' }
    ],
    History: [
        { name: 'Old Fort Museum', time: 'Morning', note: 'Guided historical tour' },
        { name: 'Heritage Walk', time: 'Afternoon', note: 'Explore ancient markets' },
        { name: 'War Memorial', time: 'Evening', note: 'Light and sound show' },
        { name: 'Royal Palace', time: 'Morning', note: 'Architecture tour' }
    ],
    Food: [
        { name: 'Street Food Lane', time: 'Evening', note: 'Spicy local snacks' },
        { name: 'Popular Cafe', time: 'Morning', note: 'Best brunch in town' },
        { name: 'Spice Market', time: 'Afternoon', note: 'Taste authentic spices' },
        { name: 'Rooftop Diner', time: 'Dinner', note: 'Fine dining with view' }
    ],
    Adventure: [
        { name: 'Adventure Park', time: 'Afternoon', note: 'Thrilling rides' },
        { name: 'City Cycling', time: 'Morning', note: 'Morning trail ride' },
        { name: 'Rock Climbing Gym', time: 'Evening', note: 'Indoor climbing activity' },
        { name: 'River Rafting', time: 'Morning', note: 'Water sports fun' }
    ]
};

// Helper: Cheezen random select karne ke liye
function getRandomItems(arr, count) {
    if (!arr) return [];
    // Array ko shuffle (mix) karna
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

exports.generateItinerary = (req, res) => {
    try {
        let { preferences, duration } = req.body;
        
        // Agar user ne kuch select nahi kiya, toh default le lo
        if (!Array.isArray(preferences) || preferences.length === 0) {
            preferences = ['Nature', 'History', 'Food'];
        }
        
        duration = Number(duration) || 1;

        const days = [];
        
        // Har din ke liye alag plan banao
        for (let d = 1; d <= duration; d++) {
            const items = [];
            
            preferences.forEach(pref => {
                // Har category se 1 random jagah uthao
                const pool = SAMPLE_SPOTS[pref];
                if (pool) {
                    // Random logic yahan laga hai
                    const randomSpot = getRandomItems(pool, 1)[0];
                    if (randomSpot) {
                        items.push({ 
                            category: pref, 
                            ...randomSpot // Baaki details copy kar lo
                        });
                    }
                }
            });

            // Is din ka plan list mein daalo
            days.push({ day: d, items });
        }

        res.json({ message: 'Itinerary generated', days });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};