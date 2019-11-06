export default
    {
        "nameParsers": [{
            "pattern": "(.*)(?:[^\\w\\d]|_)+(s(\\d+)(?:[\\s\\.-]*)?e\\s?(\\d+))(\\d\\d)?",
            "titleIndex": 1,
            "seasonIndex": 3,
            "episodeIndex": 4
        },
        {
            "pattern": "(.*)(?:[^\\w\\d]|_)+(season\\s+(\\d+)\\s+episode\\s+(\\d+))",
            "titleIndex": 1,
            "seasonIndex": 3,
            "episodeIndex": 4
        }, 
        {
            "pattern": "(.*)(?:[^\\w\\d]|_)+((\\d+)x(\\d+))",
            "titleIndex": 1,
            "seasonIndex": 3,
            "episodeIndex": 4
        },
        {
            "pattern": "(.*)(?:[^\\w\\d]|_)+(\\d)(\\d\\d)(?:[^\\w\\d]|_)+(\\d\\d)?",
            "titleIndex": 1,
            "seasonIndex": 2,
            "episodeIndex": 3
        },
        {
            "pattern": "(.*)?\\s+(\\d\\d?)\\.(\\d\\d)(\\d\\d)?",
            "titleIndex": 1,
            "seasonIndex": 2,
            "episodeIndex": 3
        },
        {
            "pattern": "[eE](\\d\\d?)[sS](\\d\\d)",
            "seasonIndex": 2,
            "episodeIndex": 3,
            "usePath": true
        }
        ]
    }

