// SCP Foundation - Personnel Data Repository
// Contains detailed information about Foundation personnel

// Define the Personnel data store
const PersonnelDataStore = {
    // Dr. Samantha Carter
    "P-10294": {
        id: "P-10294",
        name: "Dr. Samantha Carter",
        position: "Senior Researcher",
        department: "Research",
        clearanceLevel: "Level 4",
        status: "Active",
        specialization: "Biological anomalies, Containment procedures",
        clearanceRequired: "Level 3",
        thumbnail: "/assets/images/personnel/carter-thumbnail.jpg",
        
        // Detailed information
        description: `
            Dr. Samantha Carter is a senior researcher specializing in biological anomalies and containment procedures. She has been with the Foundation for 12 years and has contributed to the successful containment of numerous entities, particularly those with biological or organic properties.
        `,
        
        biography: `
            Dr. Carter joined the Foundation in 2010 after being recruited from [REDACTED] University where she was a professor of advanced biotechnology and anomalous genetics. Her research on non-standard biological systems caught the attention of Foundation recruiters.
            
            Prior to her academic career, she served in [REDACTED] where she gained experience handling hazardous biological materials. This combined background in both theoretical and practical applications made her an ideal candidate for the Foundation's research division.
            
            During her tenure, she has been directly responsible for developing containment protocols for several Keter-class entities, including improved acid solution compositions for SCP-682 and biological stabilization techniques for SCP-610.
        `,
        
        psychologicalProfile: `
            Dr. Carter displays exceptional stress tolerance and emotional stability, particularly in high-pressure situations. She maintains a clinical detachment when necessary but shows appropriate empathy and concern for personnel under her supervision.
            
            Annual psychological evaluations consistently show a heightened sense of duty and commitment to the Foundation's mission. No significant psychological vulnerabilities or concerns have been noted in recent evaluations.
            
            Dr. Carter exhibits slight workaholic tendencies and occasional difficulty maintaining work-life balance, but this has not impacted her performance or judgment. She has been responsive to recommendations for scheduled downtime.
        `,
        
        notableIncidents: [
            {
                date: "2013-06-24",
                incident: "First encounter with SCP-610",
                description: "Dr. Carter was exposed to minimal traces of SCP-610 during initial containment. Quick intervention prevented infection, and Dr. Carter volunteered to continue work on the project despite the personal risk."
            },
            {
                date: "2017-11-08",
                incident: "Site-45 Breach",
                description: "During containment breach at Site-45, Dr. Carter successfully coordinated emergency protocols that minimized casualties and prevented the escape of three Euclid-class entities."
            },
            {
                date: "2021-03-15",
                incident: "SCP-096 Incident",
                description: "Dr. Carter narrowly avoided viewing SCP-096's face during a containment failure, demonstrating exceptional presence of mind by following emergency protocols."
            }
        ],
        
        achievements: [
            {
                date: "2012",
                description: "Developed improved containment solutions for biological anomalies, increasing containment stability by 42%"
            },
            {
                date: "2016",
                description: "Foundation Award for Excellence in Research for work on SCP-008 countermeasures"
            },
            {
                date: "2019",
                description: "Led team that established new protocols for handling parasitic anomalies, now standard across all Foundation sites"
            }
        ],
        
        currentResearch: `
            Dr. Carter is currently leading research on the interaction between different biological anomalies and potential applications for containment. Her team is exploring neutralization techniques for Class-4 biological threats and developing improved isolation systems for entities with cross-contamination potential.
            
            Secondary projects include analysis of SCP-610 samples under controlled conditions and collaborative work with Dr. [REDACTED] on theoretical resistance mechanisms to reality-altering biological anomalies.
        `,
        
        notes: [
            {
                date: "2018-04-21",
                author: "Dr. Bright",
                content: "Dr. Carter continues to show exceptional judgment in high-risk scenarios. Recommend consideration for Site Director position when appropriate vacancy occurs."
            },
            {
                date: "2020-07-14",
                author: "O5-7",
                content: "Approved increased clearance for Project Olympia. Dr. Carter's expertise is essential to advancing this initiative."
            }
        ]
    },
    
    // Agent Michael Torres
    "P-45632": {
        id: "P-45632",
        name: "Agent Michael Torres",
        position: "Field Agent",
        department: "Mobile Task Force Epsilon-11",
        clearanceLevel: "Level 3",
        status: "Active",
        specialization: "Combat, Retrieval operations",
        clearanceRequired: "Level 2",
        thumbnail: "/assets/images/personnel/torres-thumbnail.jpg",
        
        // Detailed information
        description: `
            Agent Michael Torres is a veteran field operative with Mobile Task Force Epsilon-11 ("Nine-Tailed Fox"), specializing in containment breach scenarios and the recapture of escaped anomalies. He is known for his exceptional tactical skills and quick decision-making in high-pressure situations.
        `,
        
        biography: `
            Agent Torres was recruited to the Foundation in 2014 from [REDACTED] Special Forces, where he served with distinction for 8 years. His military record indicated exceptional performance in unconventional warfare scenarios and adaptation to unusual combat environments.
            
            Initial Foundation deployment was with MTF Beta-7 ("Maz Hatters") where he participated in operations involving hazardous environment anomalies. After demonstrating exceptional performance during the Site-17 incident, he was transferred to Epsilon-11.
            
            Agent Torres has participated in 43 major containment operations and over 100 minor interventions, with a success rate of 94%. He has received specialized training in anomalous entity combat tactics and reality stabilization procedures.
        `,
        
        psychologicalProfile: `
            Agent Torres displays the typical psychological profile of high-performing field operatives: elevated stress tolerance, quick decision-making capabilities, and healthy paranoia. His cognitive flexibility allows for rapid adaptation to unusual or impossible scenarios common in Foundation work.
            
            Periodic psychological evaluations show that despite exposure to numerous reality-bending and cognito-hazardous entities, Agent Torres maintains stable reality anchoring and clear perception boundaries. His Hoffman-Gantz Stability Index remains within acceptable parameters for field operations.
            
            Notable psychological traits include unusual resistance to anomalous psychological influence (rated 7.2 on the Berwick Scale) and heightened intuitive threat assessment. Some concern noted regarding occasional excessive risk-taking behavior, though this has been addressed in recent evaluations.
        `,
        
        anomalousProperties: `
            Following exposure to SCP-148 during Incident 148-A-7, Agent Torres demonstrates slightly enhanced resistance to memetic and telepathic influences (rated Class-2 on the Sheldon Scale). This property has been deemed non-threatening and potentially beneficial to his field work.
            
            Medical scans show minor anomalous properties in cellular regeneration (17% faster than baseline human) following exposure to SCP-500 during emergency medical treatment in 2018. This has been categorized as a Tier-1 beneficial modification and does not require special containment or monitoring.
        `,
        
        notableIncidents: [
            {
                date: "2015-09-03",
                incident: "Site-17 Incident",
                description: "During multiple containment breaches at Site-17, Agent Torres successfully recontained SCP-106 using emergency procedures despite sustaining injuries during the operation."
            },
            {
                date: "2017-02-12",
                incident: "Operation Black Forest",
                description: "Led retrieval team that successfully secured an undocumented anomalous entity in [REDACTED], Germany, despite unexpected reality distortions in the operational area."
            },
            {
                date: "2020-11-30",
                incident: "SCP-096 Breach",
                description: "Successfully coordinated containment team during SCP-096 breach, implementing innovative distraction techniques that prevented casualties until containment could be reestablished."
            }
        ],
        
        achievements: [
            {
                date: "2016",
                description: "Commendation for Exceptional Service during the Site-17 Incident"
            },
            {
                date: "2018",
                description: "Developed improved tactical approaches for dealing with humanoid Keter-class entities, now incorporated into standard MTF training"
            },
            {
                date: "2021",
                description: "Foundation Medal of Valor for actions during Incident 682-E15"
            }
        ],
        
        restrictions: `
            Due to potential cumulative exposure effects, Agent Torres is restricted from operations involving SCP-148 and related anomalies.
            
            Agent Torres is limited to a maximum of 3 sequential deployments involving cognito-hazardous entities, with mandatory 72-hour clearance periods between such deployments.
            
            Field operations involving Class-4 or higher reality benders require O5 approval before Agent Torres can be assigned.
        `,
        
        notes: [
            {
                date: "2019-08-17",
                author: "Tactical Officer Reynolds",
                content: "Agent Torres continues to show exceptional judgment in volatile situations. His rapid assessment and adaptation to the unexpected breach of SCP-939 saved numerous lives."
            },
            {
                date: "2021-04-22",
                author: "Dr. Morgan",
                content: "Recommend continued quarterly medical monitoring of anomalous healing properties. While currently beneficial, we should ensure no progressive changes are occurring."
            }
        ]
    },
    
    // Dr. James Wilson
    "P-20183": {
        id: "P-20183",
        name: "Dr. James Wilson",
        position: "Research Director",
        department: "Research",
        clearanceLevel: "Level 5",
        status: "Active",
        specialization: "Theoretical physics, Reality bending phenomena",
        clearanceRequired: "Level 4",
        thumbnail: "/assets/images/personnel/wilson-thumbnail.jpg",
        
        // Detailed information
        description: `
            Dr. James Wilson serves as a Research Director overseeing projects related to theoretical physics and reality-bending phenomena. His pioneering work on Hume field dynamics has revolutionized the Foundation's understanding and containment of reality-altering entities.
        `,
        
        biography: `
            Dr. Wilson joined the Foundation in 2003 after a distinguished career at [REDACTED] where he developed several groundbreaking theories in quantum mechanics and dimensional stability. His academic work on theoretical multi-dimensional constructs attracted the Foundation's attention when it correctly predicted several anomalous phenomena not yet publicly documented.
            
            Initially recruited as a consultant for containment of reality-bending entities, Dr. Wilson quickly demonstrated exceptional insight into the mechanics of reality distortion. His development of the Wilson-Scranton Reality Anchor Theory in 2007 led to significant improvements in Scranton Reality Anchor designs and implementation.
            
            Dr. Wilson has held positions of increasing responsibility, eventually being appointed Research Director in 2015 following the [REDACTED] incident, where his quick thinking and theoretical applications prevented catastrophic reality collapse at Site-41.
        `,
        
        psychologicalProfile: `
            Dr. Wilson displays the cognitive profile typical of theoretical physicists with exceptional abstract reasoning abilities and pattern recognition. Psychological evaluations consistently show high scores in conceptual integration and hypothesis formation, even under stress conditions.
            
            Despite extended exposure to reality-bending concepts and entities, Dr. Wilson maintains solid reality anchoring and clear cognitive boundaries between theoretical possibilities and baseline reality. His Hoffman-Gantz Stability Index remains exceptional at 9.3/10.
            
            Periodic evaluations note potential concerns regarding workaholic tendencies and occasional hyper-focus on theoretical problems to the exclusion of practical considerations. Management strategies have been implemented to address these tendencies without compromising his valuable research contributions.
        `,
        
        anomalousProperties: `
            Dr. Wilson shows no anomalous properties despite extensive career exposure to various reality-bending effects. His natural resistance to cognitive distortion is notable but remains within human baseline maximum parameters.
        `,
        
        notableIncidents: [
            {
                date: "2008-11-23",
                incident: "Incident 2935-A",
                description: "Dr. Wilson correctly predicted the dimensional instability of SCP-2935 before instrumentation detected any variations, allowing for preventative measures."
            },
            {
                date: "2015-07-14",
                incident: "Site-41 Reality Fluctuation",
                description: "During catastrophic failure of experimental reality anchors, Dr. Wilson implemented emergency stabilization procedures that prevented site-wide reality collapse."
            },
            {
                date: "2019-03-29",
                incident: "Project Kronos Anomaly",
                description: "When temporal distortions appeared during Project Kronos testing, Dr. Wilson's quick recalculations and adjustments prevented temporal contamination of the research facility."
            }
        ],
        
        achievements: [
            {
                date: "2007",
                description: "Development of Wilson-Scranton Reality Anchor Theory"
            },
            {
                date: "2012",
                description: "Foundation Award for Theoretical Excellence for work on multidimensional containment principles"
            },
            {
                date: "2016",
                description: "Led team that developed improved Kant counters with 300% greater sensitivity to reality fluctuations"
            },
            {
                date: "2020",
                description: "Pioneer Medal for contributions to Project Heimdall"
            }
        ],
        
        currentResearch: `
            Dr. Wilson currently oversees several high-priority research initiatives, including Project Heimdall (improved early detection of reality-bending events) and the Membrane Initiative (theoretical framework for understanding dimensional boundaries).
            
            His personal research focuses on developing a unified mathematical model of reality distortion that could potentially predict and counteract anomalous reality shifts before they manifest. Preliminary results have been promising, with several successful small-scale predictions of SCP-3XXX behavior patterns.
            
            Dr. Wilson also serves as a consultant on the O5-approved Project Threshold, details of which require Level 5 clearance.
        `,
        
        notes: [
            {
                date: "2018-05-02",
                author: "O5-3",
                content: "Dr. Wilson's contributions to reality stabilization technology cannot be overstated. Consider for special recognition once Project Heimdall reaches implementation phase."
            },
            {
                date: "2021-11-15",
                author: "Dr. Everett",
                content: "Dr. Wilson's latest theoretical paper on sub-quantum Hume field interactions may necessitate rethinking our entire approach to certain Keter-class containments. Recommend immediate review by the Theoretical Division."
            }
        ]
    },
    
    // Security Officer Alex Mercer
    "P-67129": {
        id: "P-67129",
        name: "Security Officer Alex Mercer",
        position: "Senior Guard",
        department: "Security",
        clearanceLevel: "Level 2",
        status: "Active",
        specialization: "Perimeter security, Containment protocols",
        clearanceRequired: "Level 1",
        thumbnail: "/assets/images/personnel/mercer-thumbnail.jpg",
        
        // Detailed information
        description: `
            Security Officer Alex Mercer is a senior member of the Site-19 security team, specializing in perimeter security and containment protocols for Safe and Euclid-class entities. He has demonstrated exceptional reliability and attention to detail in maintaining security protocols.
        `,
        
        biography: `
            Officer Mercer joined the Foundation in 2016 after serving six years in military police. His exceptional record in maintaining security in high-sensitivity areas made him an ideal candidate for Foundation security operations.
            
            After completing standard Foundation security training, Officer Mercer showed particular aptitude for anomalous containment awareness, scoring in the 94th percentile on the Bergstrom Awareness Test. This led to his assignment to increasingly sensitive containment areas.
            
            Officer Mercer rapidly progressed from basic security duties to specialized containment security, and was promoted to Senior Guard in 2019 after his actions during a minor containment breach of SCP-131 prevented potential cross-contamination with more dangerous entities.
        `,
        
        psychologicalProfile: `
            Officer Mercer displays the psychological profile ideal for security personnel: vigilant without paranoia, disciplined without rigidity, and capable of maintaining focus during extended monitoring assignments.
            
            Psychological evaluations indicate strong reality anchoring and resilience to minor cognito-hazardous exposure. His Hoffman-Gantz Stability Index is consistently rated at 8.4/10, above average for security personnel.
            
            Notable psychological traits include exceptional procedural memory and situational awareness. Unlike many long-term security personnel, Officer Mercer shows minimal signs of complacency or routine fatigue, maintaining consistent alertness levels even during extended assignments.
        `,
        
        notableIncidents: [
            {
                date: "2017-06-12",
                incident: "SCP-131 Escape",
                description: "Officer Mercer successfully recaptured instances of SCP-131 after they escaped containment, preventing their interaction with potentially harmful anomalies."
            },
            {
                date: "2019-11-05",
                incident: "Site-19 Section B Power Failure",
                description: "During an unexpected power failure, Officer Mercer implemented manual containment protocols for affected sectors, maintaining security until systems were restored."
            },
            {
                date: "2021-02-28",
                incident: "Unauthorized Access Attempt",
                description: "Officer Mercer identified and apprehended an individual attempting to access restricted areas using falsified credentials, later discovered to be connected to Chaos Insurgency infiltration attempts."
            }
        ],
        
        achievements: [
            {
                date: "2018",
                description: "Commendation for Perfect Procedural Compliance - Annual Security Audit"
            },
            {
                date: "2019",
                description: "Promotion to Senior Guard"
            },
            {
                date: "2020",
                description: "Developed improved patrol patterns for SCP-173 containment area, reducing blind spots by 37%"
            }
        ],
        
        currentDuties: `
            Officer Mercer currently oversees security for Section C of Site-19, which contains primarily Safe and low-risk Euclid entities. His responsibilities include regular security patrols, monitoring containment status, supervising junior security personnel, and implementing emergency protocols when necessary.
            
            Additional duties include training new security personnel on containment-specific protocols and participating in the monthly security audit team for Safe-class anomalies.
        `,
        
        notes: [
            {
                date: "2020-03-17",
                author: "Security Director Phillips",
                content: "Officer Mercer consistently demonstrates exceptional attention to detail in his duties. His identification of the minor containment weakness in SCP-131's chamber before any breach occurred shows the kind of proactive security awareness we need."
            },
            {
                date: "2021-08-09",
                author: "Dr. Steiner",
                content: "Officer Mercer's suggestion for modified containment protocols for SCP-131 has merit and should be considered for implementation. His practical understanding of security concerns balances well with research requirements."
            }
        ]
    },
    
    // Dr. Elizabeth Chen
    "P-83021": {
        id: "P-83021",
        name: "Dr. Elizabeth Chen",
        position: "Containment Specialist",
        department: "Containment",
        clearanceLevel: "Level 4",
        status: "Active",
        specialization: "Keter-class containment, Emergency protocols",
        clearanceRequired: "Level 3",
        thumbnail: "/assets/images/personnel/chen-thumbnail.jpg",
        
        // Detailed information
        description: `
            Dr. Elizabeth Chen serves as a senior containment specialist with primary focus on Keter-class entities and emergency containment protocols. Her innovative containment designs have improved security for several high-risk anomalies and reduced breach incidents by 28% in her areas of responsibility.
        `,
        
        biography: `
            Dr. Chen joined the Foundation in 2012 with a background in structural engineering and anomalous materials research from [REDACTED] Institute. Her doctoral work on non-Euclidean architecture and theoretical spaces brought her to the Foundation's attention.
            
            Initially assigned to Safe and Euclid containment design teams, Dr. Chen quickly demonstrated exceptional aptitude for anticipating containment failures and designing redundant systems. After her successful redesign of SCP-682's acid containment system in 2014, she was promoted to work primarily with Keter-class containment.
            
            Dr. Chen was appointed senior containment specialist in 2017 following the successful implementation of her redesigned emergency protocols during the Site-23 incident, which prevented multiple simultaneous breaches during a power system failure.
        `,
        
        psychologicalProfile: `
            Dr. Chen displays the cognitive traits common to exceptional engineers: strong analytical thinking, systems-level perspective, and the ability to anticipate failure cascades before they manifest. Psychological evaluations consistently show high scores in creative problem-solving under pressure.
            
            Despite working primarily with Keter-class containment, Dr. Chen maintains healthy psychological boundaries and appropriate caution without developing containment paranoia. Her Hoffman-Gantz Stability Index is rated at 8.7/10, indicating excellent reality anchoring despite exposure to reality-bending entities.
            
            Notable psychological traits include exceptional spatial reasoning (rated at the 99.7th percentile) and an unusual ability to conceptualize non-standard geometries that has proven valuable in containing entities that manipulate spatial dimensions.
        `,
        
        anomalousProperties: `
            Following prolonged work with SCP-184, Dr. Chen displays minor spatial intuition anomalies (rated Class-1 on the Spatial Perception Index). This manifests as an enhanced ability to navigate and conceptualize complex or non-Euclidean spaces.
            
            This anomalous property has been deemed non-threatening and beneficial to her work. Quarterly evaluations show no progression or concerning developments in this property since initial manifestation in 2016.
        `,
        
        notableIncidents: [
            {
                date: "2014-09-30",
                incident: "SCP-682 Containment Redesign",
                description: "Dr. Chen's redesigned acid containment system increased breach resistance by 76% and reduced maintenance requirements, significantly improving long-term containment stability."
            },
            {
                date: "2017-03-12",
                incident: "Site-23 Emergency Response",
                description: "During catastrophic power failure at Site-23, Dr. Chen's emergency protocols prevented multiple containment failures, earning commendation from O5 Command."
            },
            {
                date: "2020-05-08",
                incident: "SCP-3008 Boundary Stabilization",
                description: "Dr. Chen developed and implemented spatial anchors that reduced boundary fluctuations in SCP-3008 by 43%, significantly decreasing accidental civilian entries."
            }
        ],
        
        achievements: [
            {
                date: "2015",
                description: "Foundation Engineering Excellence Award for SCP-682 containment redesign"
            },
            {
                date: "2017",
                description: "Promotion to Senior Containment Specialist"
            },
            {
                date: "2019",
                description: "Developed new protocols for containing dimensionally unstable entities, now standard across all Foundation sites"
            },
            {
                date: "2021",
                description: "Scranton Award for innovations in reality anchor implementation"
            }
        ],
        
        currentResearch: `
            Dr. Chen currently leads Project Bulwark, focused on developing next-generation containment systems for reality-bending Keter-class entities that incorporate predictive breach response mechanisms.
            
            Secondary projects include collaborative work with Dr. Wilson on applying theoretical physics principles to practical containment scenarios and development of emergency containment protocols for newly discovered spatial anomalies.
            
            Dr. Chen also serves as the containment consultant for the cross-disciplinary Threshold Initiative (Level 4 clearance required for details).
        `,
        
        notes: [
            {
                date: "2019-11-04",
                author: "O5-9",
                content: "Dr. Chen's containment innovations continue to exceed expectations. Her predictive approach to containment failure has prevented at least three major breaches this year alone."
            },
            {
                date: "2021-07-22",
                author: "Dr. Wilson",
                content: "Our collaborative work on dimensionally-stable containment systems shows promising results. Dr. Chen's practical engineering perspective perfectly complements theoretical models, creating implementable solutions to previously intractable containment challenges."
            }
        ]
    }
};

// Method to get Personnel data by ID
function getPersonnelById(id) {
    return PersonnelDataStore[id] || null;
}

// Method to get all Personnel IDs
function getAllPersonnelIds() {
    return Object.keys(PersonnelDataStore);
}

// Method to get Personnel by clearance level (numeric, e.g., 1-5)
function getPersonnelByClearance(level) {
    // Convert level to numeric if it's a string like "Level 3"
    if (typeof level === 'string') {
        level = parseInt(level.replace('Level ', ''));
    }
    
    return Object.values(PersonnelDataStore).filter(person => {
        const requiredLevel = parseInt(person.clearanceRequired.replace('Level ', ''));
        return requiredLevel <= level;
    });
}

// Method to search Personnel by term
function searchPersonnel(term) {
    term = term.toLowerCase();
    return Object.values(PersonnelDataStore).filter(person => {
        return person.id.toLowerCase().includes(term) || 
               person.name.toLowerCase().includes(term) ||
               person.department.toLowerCase().includes(term) ||
               person.position.toLowerCase().includes(term);
    });
}

// Export functionality if in a module environment
if (typeof module !== 'undefined') {
    module.exports = {
        getPersonnelById,
        getAllPersonnelIds,
        getPersonnelByClearance,
        searchPersonnel
    };
} 