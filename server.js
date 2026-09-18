const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error('Database connection error:', err.message);
    else console.log('Connected to SQLite database.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT,
            image_url TEXT
        )
    `);

    db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
        if (row && row.count === 0) {
            const stmt = db.prepare("INSERT INTO products (title, category, price, description, image_url) VALUES (?, ?, ?, ?, ?)");
            
            const fiftyProducts = [
                // --- PPE & SAFETY / HEAD PROTECTION (1-10) ---
                ["JSP EVO2 Safety Helmet Ratchet Vented White", "ppe-safety", 0.00, "JSP EVO2 safety helmet featuring a tough HDPE shell, 6-point harness, and wheel ratchet adjustment.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
                ["JSP EVO3 Comfort Plus Vented Safety Helmet Yellow", "ppe-safety", 0.00, "EVO3 industrial safety helmet combining a super strong shell with supreme all-day comfort.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
                ["JSP Hardcap Aerolite Baseball Bump Cap Black", "ppe-safety", 0.00, "Lightweight 60g bump cap designed with EPP impact liner and washable outer cover.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
                ["Centurion CorePro Safety Helmet Slip Ratchet Blue", "ppe-safety", 0.00, "General purpose industrial safety helmet with high density polyethylene shell.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
                ["Portwest Endurance Vented Hard Hat High-Vis Orange", "ppe-safety", 0.00, "ABS shell safety helmet with vented design and 6-point textile harness.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
                ["Portwest Peak View Safety Helmet Translucent Smoke", "ppe-safety", 0.00, "Translucent peak safety helmet allowing wearers to look upwards without tilting head.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
                ["JSP EVO8 High Impact Industrial Safety Helmet", "ppe-safety", 0.00, "Conforms to EN14052 side impact protection standard for extreme construction environments.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
                ["JSP Invincible Safety Helmet Visor Combination", "ppe-safety", 0.00, "Integrated safety helmet system with clear polycarbonate face shield for splash resistance.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
                ["Centurion Concept Height Safety Helmet Unvented", "ppe-safety", 0.00, "Climbing style safety helmet with 4-point chin strap ideal for working at height.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
                ["JSP Sonis 1 Helmet Mounted Ear Defenders 26dB", "ppe-safety", 0.00, "Attachable ear defenders providing 26dB SNR attenuation designed specifically for JSP helmets.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],

                // --- PROTECTIVE GLOVES (11-20) ---
                ["Supertouch Powderfree Nitrile Gloves Box of 50 Pairs (ST-12671)", "gloves", 0.00, "High-grade powder-free nitrile examination gloves offering superior puncture resistance.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Cut-Resistant Site Gloves Level D Polyurethane", "gloves", 0.00, "Durable polyurethane coated cut-resistant gloves for site handling and mechanical assembly.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Chemical Nitrile Gauntlets Heavy Duty 33cm", "gloves", 0.00, "Waterproof and chemical resistant flock-lined nitrile gauntlets for industrial cleaning.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Thermal Gripper Winter Work Gloves Foam Latex", "gloves", 0.00, "Warm winter fleece lined work gloves with crinkle latex palms for cold storage work.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Heavy Duty Split Leather Rigger Gloves Reinforced", "gloves", 0.00, "Classic leather rigger gloves with safety cuff and fleece palm lining.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Black Latex Disposable Micro-Grip Gloves Box of 100", "gloves", 0.00, "Heavy duty textured black latex disposable gloves for automotive mechanics and precision work.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Ansell HyFlex Foam Nitrile Assembly Gloves", "gloves", 0.00, "Ultra-lightweight precision handling gloves offering exceptional dexterity and oil grip.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Heat Resistant Welders Split Cowhide Leather Gauntlets", "gloves", 0.00, "14-inch red leather welding gauntlets with thermal lining protecting against radiant heat.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Impact Protection Cut Level E Anti-Vibration Gloves", "gloves", 0.00, "TPR impact protective back-of-hand bumpers combined with high cut-level palm padding.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Clear Vinyl Food Safe Disposable Gloves Powder Free (100)", "gloves", 0.00, "Smooth clear vinyl disposable gloves compliant with food handling standards.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],

                // --- HI-VIS CLOTHING (21-28) ---
                ["Hi-Vis Yellow Executive Waistcoat Vest Class 2", "hivis", 0.00, "High visibility vest featuring ID pocket, mobile phone holder, and front zip closure.", "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80"],
                ["Hi-Vis Orange Railway Standard Vest RIS-3279-TOM", "hivis", 0.00, "Railway industry approved high visibility vest with reflective tape strips.", "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80"],
                ["Hi-Vis Two Tone Waterproof Bomber Jacket Yellow/Navy", "hivis", 0.00, "Heavyweight padded waterproof bomber jacket with fleece collar and concealed hood.", "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80"],
                ["Hi-Vis Breathable Rain Trousers Yellow Class 1", "hivis", 0.00, "Windproof and waterproof elasticated waist over-trousers with taped seams.", "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80"],
                ["Hi-Vis Cotton Comfort Short Sleeve T-Shirt Yellow", "hivis", 0.00, "Breathable moisture-wicking high-vis t-shirt with flexible reflective tape.", "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80"],
                ["Hi-Vis Fleece Sweatshirt Quarter Zip Orange", "hivis", 0.00, "Warm polyester anti-pill fleece sweater suitable for outdoor site work.", "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80"],
                ["Hi-Vis Softshell Jacket 3-Layer Water Resistant", "hivis", 0.00, "Modern fitted high-vis softshell jacket providing wind protection and breathability.", "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80"],
                ["Hi-Vis Elasticated Trouser Braces Reflective", "hivis", 0.00, "Adjustable high visibility shoulder harness straps with quick release buckle.", "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80"],

                // --- CONSTRUCTION & INDUSTRY (29-35) ---
                ["Moldex FFP3 Respirator Dust Mask with Ventex Valve (Pack of 10)", "construction", 0.00, "High filtration reusable dust mask protecting against fine toxic dusts, fumes, and mists.", "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=500&q=80"],
                ["3M Lightweight Polycarbonate Safety Spectacles Clear Lens", "construction", 0.00, "Anti-scratch and anti-fog protective eyewear with wrap-around lens design.", "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=500&q=80"],
                ["Bollé Safety Goggles Indirect Vent Chemical Splash Protection", "construction", 0.00, "Sealed safety goggles with clear panoramic lens and wide adjustable headband.", "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=500&q=80"],
                ["Foldable Ear Defenders SNR 32dB Adjustable Headband", "construction", 0.00, "Compact folding ear muffs providing maximum noise protection on noisy job sites.", "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=500&q=80"],
                ["3M Soft Foam Earplugs SNR 37dB Uncorded Box of 200 Pairs", "construction", 0.00, "Slow recovery expanding foam earplugs providing superior acoustic sealing.", "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=500&q=80"],
                ["Fall Protection Harness 2-Point Safety Kit with Lanyard", "construction", 0.00, "Full body height safety harness including scaffold hook lanyard and storage bag.", "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=500&q=80"],
                ["Heavy Duty Knee Pads Gel Foam Cushioning Ergonomic", "construction", 0.00, "Non-marking cap knee pads designed for flooring installers and builders.", "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=500&q=80"],

                // --- MEDICAL & FIRST AID (36-43) ---
                ["BSI Compliant Workplace First Aid Kit Small (1-10 Person)", "first-aid", 0.00, "British Standard compliant first aid kit suitable for low hazard workplaces.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["BSI Compliant Workplace First Aid Kit Medium (11-25 Person)", "first-aid", 0.00, "BS 8599-1 compliant first aid box designed for medium workplace environments.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["BSI Compliant Workplace First Aid Kit Large (25+ Person)", "first-aid", 0.00, "Comprehensive workplace first aid kit in a durable wall-mountable green casing.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Emergency Eyewash Station Double Bottle (2x500ml)", "first-aid", 0.00, "Wall mountable eyewash station with mirror and two sterile 500ml saline eye wash bottles.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Sterile Saline Eyewash Solution 500ml Bottle", "first-aid", 0.00, "0.9% sterile sodium chloride emergency eye wash bottle for flushing dust.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["BurnShield Emergency Burn Care Kit Box", "first-aid", 0.00, "Specialist burn care kit containing Hydrogel burn dressings and soothing gel bottles.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Blue Detectable Washproof Plasters Pack of 100", "first-aid", 0.00, "Catering and food preparation metal detectable sterile adhesive plasters.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
                ["Instant Ice Pack Cold Compress Disposable Pack of 10", "first-aid", 0.00, "Single-use squeeze instant cold packs for immediate relief of sprains and strains.", "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],

                // --- WORKWEAR & FOOTWEAR (44-50) ---
                ["Steel Toe Cap Leather Safety Boots S3 Waterproof Black", "workwear", 0.00, "Heavy duty S3 safety boots featuring steel toe cap and puncture resistant midsole.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"],
                ["Composite Toe Non-Metal Lightweight Safety Trainers S1P", "workwear", 0.00, "Sporty breathable safety shoes with composite toe cap and anti-static sole.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"],
                ["Safety Wellingtons Steel Toe Midsole Waterproof Kneelength", "workwear", 0.00, "Heavy-duty PVC safety wellies with steel toe cap and oil resistant outer sole.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"],
                ["Multi-Pocket Cargo Work Trousers Heavy Duty Cotton Blend", "workwear", 0.00, "Durable work trousers with reinforced knee pad pockets and holster utility pockets.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"],
                ["Waterproof Thermal Overhead Work Jacket Black", "workwear", 0.00, "Insulated windproof work jacket with ripstop fabric and adjustable hood.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"],
                ["Heavy Duty Elasticated Tool Belt with Leather Holsters", "workwear", 0.00, "Tradesman tool belt featuring reinforced suede pouches and hammer loop.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"],
                ["Thermal Cushioned Boot Socks Pack of 3 Pairs", "workwear", 0.00, "Heavyweight wool-rich work boot socks designed for all-day comfort in steel toe boots.", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"]
            ];

            fiftyProducts.forEach(item => stmt.run(item));
            stmt.finalize();
            console.log("Database initialized with 50 products across all categories.");
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')));

// Ultra-Exact Search API
app.get('/api/products', (req, res) => {
    const category = req.query.category;
    const search = req.query.search ? req.query.search.trim().toLowerCase() : '';

    let sql = "SELECT * FROM products";
    let params = [];

    if (category) {
        sql += " WHERE category = ?";
        params.push(category);
    }

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!search) {
            return res.json(rows);
        }

        const searchWords = search.split(/\s+/);

        const exactMatches = rows.filter(product => {
            const itemText = `${product.title} ${product.description} ${product.category}`.toLowerCase();
            return searchWords.every(word => itemText.includes(word));
        });

        exactMatches.sort((a, b) => {
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase();

            const aHasTitleMatch = aTitle.includes(search);
            const bHasTitleMatch = bTitle.includes(search);

            if (aHasTitleMatch && !bHasTitleMatch) return -1;
            if (!aHasTitleMatch && bHasTitleMatch) return 1;
            return 0;
        });

        res.json(exactMatches);
    });
});

app.get('/api/products/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: "Product not found" });
        res.json(row);
    });
});

app.listen(PORT, () => {
    console.log(`PPE DEPOT server running at http://localhost:${PORT}`);
});