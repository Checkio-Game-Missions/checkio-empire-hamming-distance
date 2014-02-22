"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {"input": [117, 17], "answer": 3},
        {"input": [1, 2], "answer": 2},
        {"input": [16, 15], "answer": 5},
        {"input": [255, 1], "answer": 7},
        {"input": [16, 16], "answer": 0},
        {"input": [204, 157], "answer": 3},
        {"input": [31, 51], "answer": 3},
        {"input": [84, 198], "answer": 3},
        {"input": [57, 39], "answer": 4},
        {"input": [140, 160], "answer": 3},

        {"input": [16, 128],
         "answer": 2
        },

        {"input": [2, 255],
         "answer": 7
        },

        {"input": [100, 200],
         "answer": 4
        },

        {"input": [255, 1],
         "answer": 7},
    ],
    "Extra": [
        {"input": [1, 999999],
         "answer": 11},

        {"input": [999999, 1],
         "answer": 11},

        {"input": [1, 524287],
         "answer": 18},

        {"input": [524288, 524287],
         "answer": 20},

        {"input": [100000, 50],
         "answer": 7},

        {"input": [193521, 872992],
         "answer": 11},

        {"input": [249994, 104391],
         "answer": 9},

        {"input": [679972, 710253],
         "answer": 8},
    ]
}
