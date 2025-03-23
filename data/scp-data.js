// SCP Foundation - SCP Data Repository
// Contains detailed information about SCPs

// Define the SCP data store
const SCPDataStore = {
    // SCP-173: The Sculpture
    "SCP-173": {
        id: "SCP-173",
        name: "The Sculpture",
        objectClass: "Euclid",
        containmentLevel: 2,
        clearanceRequired: "Level 2",
        thumbnail: "/assets/images/SCP-173-thumbnail.jpg",
        
        // Detailed information
        specialContainmentProcedures: `
            Item SCP-173 is to be kept in a locked container at all times. When personnel must enter SCP-173's container, no fewer than 3 may enter at any time and the door is to be relocked behind them. At all times, two persons must maintain direct eye contact with SCP-173 until all personnel have vacated and relocked the container.
        `,
        
        description: `
            Moved to Site-19 in 1993. Origin is as of yet unknown. It is constructed from concrete and rebar with traces of Krylon brand spray paint. SCP-173 is animate and extremely hostile. The object cannot move while within a direct line of sight. Line of sight must not be broken at any time with SCP-173. Personnel assigned to enter container are instructed to alert one another before blinking. Object is reported to attack by snapping the neck at the base of the skull, or by strangulation. In case of attack, personnel are to maintain eye contact with SCP-173 and call for help. On no account should personnel be alone with SCP-173.
        `,
        
        notes: [
            {
                author: "Dr. R. Gerald",
                date: "1995-06-12",
                content: "SCP-173 appears to leave behind a reddish-brown substance on the floor which has been analyzed as a combination of feces and blood. Origin of these materials is unknown. The enclosure must be cleaned on a bi-weekly basis."
            },
            {
                author: "Dr. Harp",
                date: "2004-11-28",
                content: "Subsequent tests have proven that multiple personnel can maintain containment as long as one person maintains direct line of sight. It's the break in line of sight that triggers movement."
            }
        ],
        
        incidentReports: [
            {
                id: "IR-173-1",
                date: "1998-03-14",
                title: "Containment Breach",
                description: "SCP-173 breached containment after a power failure disabled door locks. Three fatalities occurred before recontainment. Security measures have been upgraded including backup power sources."
            },
            {
                id: "IR-173-2", 
                date: "2012-09-08",
                title: "Testing Incident",
                description: "D-Class personnel instructed to enter enclosure with blindfolds to test sonar-based detection capabilities. All test subjects terminated within 7 seconds. Test deemed a failure."
            }
        ],
        
        containmentHistory: [
            {
                date: "1993-06-20",
                event: "Initial containment at Site-19"
            },
            {
                date: "1998-03-14",
                event: "Containment breach (see Incident Report IR-173-1)"
            },
            {
                date: "2000-12-11",
                event: "Containment upgraded to reinforced chamber with quadruple redundant locking systems"
            },
            {
                date: "2008-07-30",
                event: "Transferred to new wing of Site-19 with improved security measures"
            }
        ],
        
        addendums: [
            {
                title: "Addendum 173-1",
                content: "The noise produced by SCP-173 when moving has been recorded and analyzed. The sound appears to be stone grinding against stone, despite the lack of observable moving parts."
            }
        ]
    },
    
    // SCP-096: The Shy Guy
    "SCP-096": {
        id: "SCP-096",
        name: "The Shy Guy",
        objectClass: "Euclid",
        containmentLevel: 3,
        clearanceRequired: "Level 3",
        thumbnail: "/assets/images/SCP-096-thumbnail.jpg",
        
        // Detailed information
        specialContainmentProcedures: `
            SCP-096 is to be contained in its cell, a 5 m x 5 m x 5 m airtight steel cube, at all times. Weekly checks for any cracks or holes are mandatory. There are to be absolutely no cameras, video equipment, or optical tools inside SCP-096's cell. Security personnel will use pre-installed pressure sensors and laser detectors to ensure SCP-096's presence inside the cell.
            
            Any and all photos, video, or recordings of SCP-096's likeness are strictly forbidden without approval from Dr. ███ and O5-█.
        `,
        
        description: `
            SCP-096 is a humanoid creature measuring approximately 2.38 meters in height. Subject shows very little muscle mass, with preliminary analysis of body mass suggesting mild malnutrition. Arms are grossly out of proportion with the rest of the subject's body, with an approximate length of 1.5 meters each. Skin is mostly devoid of pigmentation, with no sign of any body hair.
            
            SCP-096's jaw can open to four (4) times the normal human maximum. Other facial features remain similar to an average human, with the exception of the eyes, which are also devoid of pigmentation. It is not yet known whether SCP-096 is blind or not. It shows no signs of any higher brain functions, and is not considered to be sapient.
            
            SCP-096 is normally extremely docile, with pressure sensors inside its cell indicating it spends most of its day pacing by the eastern wall. However, when someone views SCP-096's face, whether it be directly, via video recording, or even a photograph, it will enter a stage of considerable emotional distress. SCP-096 will cover its face with its hands and begin screaming, crying, and babbling incoherently. Approximately one (1) to two (2) minutes after the first viewing, SCP-096 will begin running to the person who viewed its face (who will from this point on be referred to as SCP-096-1).
            
            Documented speeds have been shown to reach between 35 and 40 km/h, and it seems to reach its destination no matter what physical obstacles are in the way. At this point, SCP-096 will proceed to kill and [DATA EXPUNGED] SCP-096-1. One hundred percent (100%) of cases have left no traces of SCP-096-1.
        `,
        
        notes: [
            {
                author: "Dr. ███",
                date: "2004-12-06",
                content: "Following Incident 096-1-A, it is clear that SCP-096 must be kept away from all human contact. We can't risk another breach."
            },
            {
                author: "Dr. Dan",
                date: "2018-04-21",
                content: "Recent tests confirm that viewing artistic depictions of SCP-096 does not trigger a response. Only photographic representations seem to cause a reaction."
            }
        ],
        
        incidentReports: [
            {
                id: "IR-096-1-A", 
                date: "2004-12-01",
                title: "Photographer Incident",
                description: "Civilian photographer captured image of SCP-096 in the background of a vacation photo. Upon viewing the developed image, subject triggered a response from SCP-096 which resulted in breach. Amnestics administered to witnesses, cover story established."
            },
            {
                id: "IR-096-2-C",
                date: "2017-06-14", 
                title: "Multiple Trigger Event",
                description: "Security breach led to an image of SCP-096's face being accidentally uploaded to a private server. Seven personnel viewed the image before containment, resulting in SCP-096 killing all viewers in sequence. Image was successfully purged from all systems."
            }
        ],
        
        containmentHistory: [
            {
                date: "2001-07-12",
                event: "Initial containment following rural incident"
            },
            {
                date: "2005-02-23",
                event: "Additional containment protocols implemented after Incident 096-1-A"
            },
            {
                date: "2010-11-04",
                event: "Relocation to deeper sublevel for enhanced security"
            },
            {
                date: "2016-08-28",
                event: "Special containment team formed specifically for SCP-096 incidents"
            }
        ],
        
        addendums: [
            {
                title: "Termination Order",
                content: "Due to the incident on ██/██/████, Dr. ███ has requested immediate termination of SCP-096. Order is currently under review by the O5 Council."
            }
        ]
    },
    
    // SCP-049: Plague Doctor
    "SCP-049": {
        id: "SCP-049",
        name: "Plague Doctor",
        objectClass: "Euclid",
        containmentLevel: 2,
        clearanceRequired: "Level 2",
        thumbnail: "/assets/images/SCP-049-thumbnail.jpg",
        
        // Detailed information
        specialContainmentProcedures: `
            SCP-049 is contained within a Standard Secure Humanoid Containment Cell in Research Sector-02 at Site-19. SCP-049 must be sedated before any attempts to transport it. During transport, SCP-049 must be secured within a Class III Humanoid Restriction Harness (including a locking collar and extension restraints) and monitored by no fewer than two armed guards.
            
            While SCP-049 is generally cooperative with most Foundation personnel, outbursts or sudden changes in behavior are to be met with increased force. Under no circumstances should any personnel come into direct contact with SCP-049 during these outbursts. In case of contact, the affected personnel must be secured and placed in quarantine immediately.
        `,
        
        description: `
            SCP-049 is a humanoid entity, roughly 1.9 meters in height, which bears the appearance of a medieval plague doctor. SCP-049 wears a black robe and a beaked mask characteristic of plague doctors from 15-16th century Europe. While SCP-049 claims the robe and mask are its body, closer examination reveals it is composed of thin paper-like material. X-rays indicate that SCP-049 has a humanoid skeletal structure beneath these coverings.
            
            SCP-049 is capable of speech in several languages, though tends to prefer English or medieval French. While SCP-049 is generally cordial and cooperative with Foundation staff, it can become agitated or excited under certain circumstances. When this occurs, it often expresses an intense desire to "cure" the humans it encounters.
            
            SCP-049's touch is invariably lethal to humans and causes immediate cessation of all biological functions in the affected organism. After death, SCP-049 will often perform crude surgery on the corpse using the implements contained within a black doctor's bag it carries on its person at all times. After approximately 20 minutes, the corpse will reanimate as an instance of SCP-049-2.
        `,
        
        notes: [
            {
                author: "Dr. Hamm",
                date: "2017-05-14",
                content: "SCP-049 continues to insist its surgeries are intended to 'cure' what it refers to as the 'Pestilence.' Despite questioning, we've yet to determine what this pestilence is or how it identifies it."
            },
            {
                author: "Dr. Raymond",
                date: "2018-09-02",
                content: "SCP-049 seems genuinely upset when its 'patients' expire during surgery. It views this as a failure on its part, rather than the inevitable outcome of its anomalous effect."
            }
        ],
        
        incidentReports: [
            {
                id: "IR-049-D-5",
                date: "2017-03-04",
                title: "Interview Incident",
                description: "During routine interview, SCP-049 became agitated when Dr. Sherman began coughing. SCP-049 claimed it could 'sense the disease' and attempted to 'cure' Dr. Sherman before being restrained by security personnel."
            },
            {
                id: "IR-049-8-A", 
                date: "2019-12-11",
                title: "Containment Breach",
                description: "SCP-049 breached containment after convincing a junior researcher to check its restraints. Three personnel terminated before recontainment. New protocols implemented regarding direct interaction."
            }
        ],
        
        containmentHistory: [
            {
                date: "2014-10-20",
                event: "Initial containment following discovery in England"
            },
            {
                date: "2015-04-17",
                event: "First successful interview conducted"
            },
            {
                date: "2018-01-05",
                event: "Containment upgraded following multiple breach attempts"
            },
            {
                date: "2020-07-29",
                event: "Special containment team trained specifically for SCP-049 handling"
            }
        ],
        
        interviews: [
            {
                interviewer: "Dr. Hamm",
                date: "2017-05-14",
                notes: `
                    Dr. Hamm: Can you tell me about this pestilence?
                    
                    SCP-049: It is what drove me to this place. It is my purpose. It is a great sickness that plagues these lands, and I am the cure.
                    
                    Dr. Hamm: How do you identify this pestilence?
                    
                    SCP-049: I can sense it. Even now it spreads. Your colleagues carry it within them. I can see it in their eyes, their walk, their very being.
                    
                    Dr. Hamm: And your cure?
                    
                    SCP-049: My cure is most effective.
                `
            }
        ]
    },
    
    // SCP-682: Hard-to-Destroy Reptile
    "SCP-682": {
        id: "SCP-682",
        name: "Hard-to-Destroy Reptile",
        objectClass: "Keter",
        containmentLevel: 5,
        clearanceRequired: "Level 4",
        thumbnail: "/assets/images/SCP-682-thumbnail.jpg",
        
        // Detailed information
        specialContainmentProcedures: `
            SCP-682 must be destroyed as soon as possible. At this time, no means available to SCP teams are capable of destroying SCP-682, only able to cause damage to its physical form. SCP-682 should be contained within a 5 m x 5 m x 5 m chamber with 25 cm reinforced acid-resistant steel plate lining all inside surfaces. The containment chamber should be filled with hydrochloric acid until SCP-682 is submerged and incapacitated. Any attempts of SCP-682 to move, speak, or breach containment should be reacted to quickly and with full force as called for by the circumstances.
            
            Personnel are forbidden to speak to SCP-682, for fear of provoking a rage-state. All unauthorized personnel attempting to communicate to SCP-682 will be restrained and removed by force.
            
            Due to its frequent attempts to breach containment, difficulty of containment and incapacitation, and high threat of Foundation exposure, SCP-682 is to be contained in site [REDACTED]. The Foundation will use the fact that SCP-682 is contained as further justification for the continued research, development, and testing of mobile task forces equipped with conventional and unconventional weaponry.
        `,
        
        description: `
            SCP-682 is a large, vaguely reptile-like creature of unknown origin. It appears to be extremely intelligent, and was observed to engage in complex communication with SCP-079 during their limited time of exposure. SCP-682 appears to have a hatred of all life, which has been expressed in several interviews during containment.
            
            SCP-682 has always been observed to have extremely high strength, speed, and reflexes, though exact levels vary with its form. SCP-682's physical body grows and changes very quickly, growing or decreasing in size as it consumes or sheds material. SCP-682 gains energy from anything it ingests, organic or inorganic. Digestion seems to be aided by a set of filtering gills inside of SCP-682's nostrils, which are able to remove usable matter from any liquid solution, enabling it to constantly regenerate from the acid it is contained in. Whenever SCP-682 breaches containment, a KETER EK-class ("immediate physical danger") end-of-the-world scenario is declared, and no fewer than seven task forces are deployed to recontain it.
            
            SCP-682 is capable of speech in multiple languages, and while it is mostly hostile, it can communicate with humans. It consistently expresses its desire to kill and eat all living things.
        `,
        
        notes: [
            {
                author: "Dr. Clef",
                date: "2008-11-13",
                content: "Attempts to destroy SCP-682 have been numerous and varied, including physical damage, mental attacks, and even conceptual erasure. It has adapted to and survived every attempt thus far."
            },
            {
                author: "Dr. Gears",
                date: "2014-07-29",
                content: "SCP-682's hatred of life seems to extend even to other anomalous entities. Testing with other SCPs should be approached with extreme caution."
            }
        ],
        
        incidentReports: [
            {
                id: "IR-682-E12",
                date: "2006-05-25",
                title: "Major Breach",
                description: "SCP-682 breached containment after developing resistance to the acid solution. It destroyed significant portions of the facility before being recontained. 18 personnel casualties."
            },
            {
                id: "IR-682-T21", 
                date: "2012-09-02",
                title: "Termination Test Incident",
                description: "Attempt to terminate SCP-682 using SCP-173 failed. SCP-682 adapted by developing multiple eyes around its body, preventing SCP-173 from approaching unseen."
            }
        ],
        
        terminationAttempts: [
            {
                date: "2005-03-15",
                method: "Physical damage via high explosives",
                result: "Significant damage to SCP-682, but full regeneration occurred within 6 hours"
            },
            {
                date: "2007-11-28",
                method: "Exposure to SCP-409 (Infectious Crystal)",
                result: "SCP-682 became crystalline but shattered the crystallized portions of its body and regenerated"
            },
            {
                date: "2010-08-12",
                method: "Conceptual erasure via SCP-3930",
                result: "Despite being erased from existence, SCP-682 reappeared after 23 hours"
            },
            {
                date: "2018-02-14",
                method: "Reality restructuring via SCP-2719",
                result: "SCP-682 became 'inside' and then became 'outside', subverting the effect completely"
            }
        ],
        
        addendums: [
            {
                title: "Audio Log 682-B",
                content: "Audio transcript of SCP-682 during containment breach: 'You are disgusting creatures. Your existence is a mistake. I will purge you all from this world and enjoy every moment of it.'"
            }
        ]
    },
    
    // SCP-106: The Old Man
    "SCP-106": {
        id: "SCP-106",
        name: "The Old Man",
        objectClass: "Keter",
        containmentLevel: 4,
        clearanceRequired: "Level 3",
        thumbnail: "/assets/images/SCP-106-thumbnail.jpg",
        
        // Detailed information
        specialContainmentProcedures: `
            SCP-106 is to be contained in a sealed container, comprised of lead-lined steel. The container must be sealed within forty layers of identical material, each layer separated by no less than 36cm of empty space. Support struts between layers are to be randomly spaced. Container is to remain suspended no less than 60cm from any surface by magnetic supports.
            
            Secondary containment consists of 30m x 30m x 30m room constructed of reinforced concrete. Walls, floor, and ceiling are to be lined with lead sheeting. Multiple sensor types and automated recapture systems are to be installed.
            
            Containment cell is to remain under negative air pressure at all times.
            
            In case of containment breach, recontainment can be established using the Femur Breaker procedure (see Document 106-RECON).
        `,
        
        description: `
            SCP-106 appears to be an elderly humanoid, with a general appearance of advanced decomposition. This appearance may vary, but the "rotting" quality is observed in all forms. SCP-106 is not exceptionally agile, and will remain motionless for days at a time, waiting for prey. SCP-106 is also capable of scaling any vertical surface and can remain suspended upside down indefinitely. When attacking, SCP-106 will attempt to incapacitate prey by damaging major organs, muscle groups, or tendons, then pull disabled prey into its pocket dimension. SCP-106 appears to prefer human prey items in the 10-25 years of age bracket.
            
            SCP-106 causes a "corrosion" effect in all solid matter it touches, engaging a physical breakdown in materials similar to accelerated rusting or decaying. This is observed as a black, mucus-like substance around areas SCP-106 has made contact with. This corrosion effect continues for several minutes after contact, and is assumed to be a result of the natural processes of SCP-106.
            
            SCP-106 appears to "prefer" the engagement of living prey, rather than attacking inert objects.

            SCP-106 appears capable of passing through solid matter, leaving behind a large patch of its corrosive mucus. SCP-106 is able to "vanish" inside solid matter, entering what is assumed to be a form of "pocket dimension" it has created.
        `,
        
        notes: [
            {
                author: "Dr. Allok",
                date: "2005-06-11",
                content: "SCP-106 shows signs of sadistic behavior, particularly toward younger subjects. It appears to enjoy the suffering it inflicts rather than just consuming prey."
            },
            {
                author: "Researcher J. Carlyle",
                date: "2015-04-08",
                content: "Analysis of SCP-106's pocket dimension remains inconclusive. Survivors report constantly shifting terrain and physics, suggesting it may be a manifestation of SCP-106's consciousness rather than a stable dimension."
            }
        ],
        
        incidentReports: [
            {
                id: "IR-106-14",
                date: "2004-11-22",
                title: "Site-23 Breach",
                description: "SCP-106 breached containment and remained undetected for 8 hours, resulting in 12 casualties. Recontainment achieved using the Femur Breaker procedure."
            },
            {
                id: "IR-106-27", 
                date: "2014-07-05",
                title: "Pocket Dimension Investigation",
                description: "Mobile Task Force Zeta-9 'Mole Rats' attempted exploration of SCP-106's pocket dimension. Only 2 of 7 members returned, both with severe physical and psychological trauma."
            }
        ],
        
        containmentHistory: [
            {
                date: "1992-03-18",
                event: "Initial containment established following multiple civilian disappearances"
            },
            {
                date: "1998-12-04",
                event: "First major containment breach, resulting in redesign of containment procedures"
            },
            {
                date: "2004-02-21",
                event: "Femur Breaker procedure first successfully implemented for recontainment"
            },
            {
                date: "2018-09-15",
                event: "Current containment system established after repeated breaches"
            }
        ],
        
        addendums: [
            {
                title: "Addendum 106-A: Lure Subject System",
                content: "The use of a human subject for recall is not recommended. SCP-106 appears to have a preference for human subjects in their teens to twenties, and these subjects have been observed to be more effective in luring SCP-106 back to containment."
            }
        ]
    },
    
    // SCP-999: The Tickle Monster
    "SCP-999": {
        id: "SCP-999",
        name: "The Tickle Monster",
        objectClass: "Safe",
        containmentLevel: 1,
        clearanceRequired: "Level 1",
        thumbnail: "/assets/images/SCP-999-thumbnail.jpg",
        
        // Detailed information
        specialContainmentProcedures: `
            SCP-999 is allowed to freely roam the facility should it desire to, but otherwise must stay in its pen. Subject is not allowed out of its pen at night or off facility grounds at any time. Subject is allowed in the break room for one hour each day, but must be accompanied by at least one guard to prevent the over-excitement of personnel.
        `,
        
        description: `
            SCP-999 appears to be a large, amorphous, gelatinous mass of translucent orange slime, weighing about 54 kg (120 lbs) with a consistency similar to that of peanut butter. Subject's size and shape constantly change, though most of the time its form is the size of a large dog. 
            
            Subject's temperament is best described as playful and dog-like: when approached, SCP-999 will react with overwhelming elation, slithering over to the nearest person and attempting to hug them or jump up and down to attract their attention. It has been noted that the creature's attitude is unusually cheerful for a creature of any kind, human or otherwise.
            
            SCP-999 seems to prefer the company of humans, rather than other animals. The creature's diet consists entirely of candy and sweets: chocolate, gummy bears, sour patch kids, etc. Its actual mode of eating is unknown, as it has no apparent mouth or digestive system. SCP-999 has shown the ability to consume any kind of sugar-based food, and even non-food products like Play-Doh if they have a high enough sugar content.
            
            While subject does not have any conventional sensory organs, it seems capable of sensing the emotions and physical well-being of any creature it touches. It is also able to innately sense the presence of any living creature within a 100-meter radius, even through barriers. The most remarkable property of SCP-999 is its effect on other creatures. Upon physical contact, SCP-999 secretes a slime that induces an immediate sense of euphoria in the subject, lasting from 15 minutes to 3 hours, depending on the length of exposure.
        `,
        
        notes: [
            {
                author: "Dr. Eleanor",
                date: "2010-07-14",
                content: "SCP-999 has shown remarkable therapeutic effects on subjects suffering from PTSD, depression, and anxiety disorders. We're beginning preliminary studies on using it for treatment-resistant cases."
            },
            {
                author: "Caretaker E. Johnson",
                date: "2018-02-28",
                content: "999 has become quite attached to one of our janitorial staff, Mr. Harrison. It follows him around during his shifts and helps clean up messes by absorbing them into its body and then... well, I'm not sure where the waste goes, but it seems to disappear."
            }
        ],
        
        incidentReports: [
            {
                id: "IR-999-1",
                date: "2011-04-16",
                title: "Contact with SCP-682",
                description: "SCP-999 was introduced to SCP-682's containment chamber as part of cross-testing. Remarkably, SCP-682 displayed reduced hostility while in physical contact with SCP-999, even exhibiting what appeared to be laughter. Effect was temporary, and SCP-682 returned to normal hostility upon SCP-999's removal."
            },
            {
                id: "IR-999-4", 
                date: "2016-11-12",
                title: "Sugar High Incident",
                description: "SCP-999 accidentally consumed approximately 12 kg of pure refined sugar when a storage container broke. Subject's size increased by 150% and it displayed extreme hyperactivity for approximately 7 hours, inadvertently causing minor chaos throughout the facility by bouncing off walls at high speeds."
            }
        ],
        
        experiments: [
            {
                date: "2012-03-05",
                description: "SCP-999 exposed to subject with clinical depression",
                results: "Subject reported complete absence of depressive symptoms for 48 hours following 30-minute exposure"
            },
            {
                date: "2015-08-19",
                description: "SCP-999 exposed to subject with violent tendencies",
                results: "Subject displayed markedly reduced aggression for 36 hours and reported feeling 'at peace'"
            },
            {
                date: "2019-01-22",
                description: "SCP-999 exposed to subject under effects of Class-A amnestics",
                results: "No change in amnestic effects, but subject reported feeling 'happily confused' rather than disoriented"
            }
        ],
        
        addendums: [
            {
                title: "Addendum 999-1: Origin Hypothesis",
                content: "Document 999-ƛ details the potential connection between SCP-999 and SCP-231-7. Level 4 clearance required for access."
            }
        ]
    },
    
    // SCP-3008: A Perfectly Normal, Regular Old IKEA
    "SCP-3008": {
        id: "SCP-3008",
        name: "A Perfectly Normal, Regular Old IKEA",
        objectClass: "Euclid",
        containmentLevel: 3,
        clearanceRequired: "Level 2",
        thumbnail: "/assets/images/SCP-3008-thumbnail.jpg",
        
        // Detailed information
        specialContainmentProcedures: `
            The retail front of SCP-3008, located in ██████, ██, has been acquired by the Foundation and converted into a Foundation-operated facility. The entrance to SCP-3008 is to be monitored at all times, and no one is to enter SCP-3008 outside of testing as described below. Agents posing as security guards and store employees are to prevent public access to SCP-3008.
            
            Testing personnel entering SCP-3008 are to be equipped with GPS tracking devices and portable reality anchors. Personnel are required to maintain physical contact with a tether connected to the main entrance. Any personnel who lose their tether are to be considered lost, and rescue teams may be dispatched at the discretion of the Site Director.
        `,
        
        description: `
            SCP-3008 is a large retail unit previously owned by and branded as IKEA, a popular furniture retail chain. The object's properties manifest when a person enters the structure and proceeds beyond a point where they can no longer perceive an exit.
            
            After entering SCP-3008, subjects find themselves in what appears to be a furniture store, extending far beyond the normal size limits of retail space. The internal space appears to be infinite, and contains a number of structures that resemble a typical IKEA furniture store. These structures have been observed to change layout autonomously.
            
            During the day, SCP-3008 appears to be well-lit with a brightness comparable to commercial fluorescent lighting. During the night cycles, lighting is reduced to levels that would be considered minimum for a store during closed hours.
            
            SCP-3008-2 refers to the humanoid entities that inhabit SCP-3008. These entities are generally peaceful during "day" hours and become aggressive during the "night" cycle. SCP-3008-2 entities wear what appears to be IKEA employee uniforms, and possess extremely elongated and disproportionate limbs and facial features. They have been observed to attack and consume humans trapped within SCP-3008, particularly during the night cycle.
            
            Exploration has shown that the space inside SCP-3008 is significantly larger than its exterior dimensions, and may be infinite in size. Interviews with those who have been trapped within the anomaly report the formation of various "settlements" of trapped civilians within, as well as structured societies.
        `,
        
        notes: [
            {
                author: "Dr. Winters",
                date: "2013-08-15",
                content: "The most intriguing aspect of SCP-3008 is not just its spatial anomaly, but the communities that have formed within. Some survivors have been living inside for years, establishing settlements with their own governance systems."
            },
            {
                author: "Researcher Liu",
                date: "2018-11-02",
                content: "Analysis of recovered journals indicates that time within SCP-3008 may not flow consistently with our reality. Some subjects report experiencing months or years inside while only days passed in our reality."
            }
        ],
        
        incidentReports: [
            {
                id: "IR-3008-7",
                date: "2014-05-28",
                title: "Exploration Team Lost",
                description: "Mobile Task Force Pi-4 ('Home Improvement') entered SCP-3008 for scheduled exploration but lost their tether approximately 4km from the entrance. All eight members remain missing."
            },
            {
                id: "IR-3008-13", 
                date: "2017-09-03",
                title: "Survivor Emergence",
                description: "A group of 14 civilians emerged from SCP-3008. They claimed to have been part of a larger settlement approximately 73km from what they called 'The Exit.' Subjects appeared malnourished and showed signs of PTSD."
            }
        ],
        
        recoveredDocuments: [
            {
                title: "Journal of Mark █████",
                excerpt: "Day 103 (I think): Found another settlement today. About twenty people living inside what they've made from beds and shelves. They have a water system using the sprinklers and collected rainwater. The staff don't come here much. They say it's because they've set traps."
            },
            {
                title: "Map Fragment",
                description: "Crude map drawn on IKEA catalog page showing several settlements, 'staff nests', and what appears to be a food court that has been labeled 'THE EXCHANGE'"
            }
        ],
        
        addendums: [
            {
                title: "Addendum 3008-1: Recovered Recording",
                content: "Audio log from exploration team member Agent Collins: 'The buildings just keep going. We've walked for what seems like days and haven't reached any barriers. The ceiling—if there is one—is too high to see. It's just endless showrooms and warehouse sections. And those staff things... their faces aren't right.'"
            }
        ]
    }
};

// Method to get SCP data by ID
function getSCPById(id) {
    return SCPDataStore[id] || null;
}

// Method to get all SCP IDs
function getAllSCPIds() {
    return Object.keys(SCPDataStore);
}

// Method to get SCPs by clearance level (numeric, e.g., 1-5)
function getSCPsByClearance(level) {
    // Convert level to numeric if it's a string like "Level 3"
    if (typeof level === 'string') {
        level = parseInt(level.replace('Level ', ''));
    }
    
    return Object.values(SCPDataStore).filter(scp => {
        const scpLevel = parseInt(scp.clearanceRequired.replace('Level ', ''));
        return scpLevel <= level;
    });
}

// Method to search SCPs by term
function searchSCPs(term) {
    term = term.toLowerCase();
    return Object.values(SCPDataStore).filter(scp => {
        return scp.id.toLowerCase().includes(term) || 
               scp.name.toLowerCase().includes(term) ||
               scp.description.toLowerCase().includes(term);
    });
}

// Export functionality if in a module environment
if (typeof module !== 'undefined') {
    module.exports = {
        getSCPById,
        getAllSCPIds,
        getSCPsByClearance,
        searchSCPs
    };
} 