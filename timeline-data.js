const timelineData = [
  {
    "id": 1,
    "slide": 1,
    "images": [
      "assets/slides/slide_01.jpg"
    ],
    "title": "Project Initialization",
    "date": "Day 01",
    "description": "",
    "bgColor": "rgb(1, 1, 38)",
    "textColor": "rgb(169, 169, 242)",
    "corner": "top-left",
    "phase": "Crystal Gardening"
  },
  {
    "id": 2,
    "slide": 2,
    "images": [
      "assets/slides/slide_03.jpg"
    ],
    "title": "Site Survey & Dimensions",
    "date": "Day 08",
    "description": "",
    "bgColor": "rgb(38, 17, 1)",
    "textColor": "rgb(242, 200, 169)",
    "corner": "bottom-right",
    "phase": "Crystal Gardening"
  },
  {
    "id": 3,
    "slide": 3,
    "images": [
      "assets/slides/slide_04.jpg"
    ],
    "title": "Structural Schematics",
    "date": "Day 12",
    "description": "",
    "bgColor": "rgb(1, 24, 38)",
    "textColor": "rgb(169, 214, 242)",
    "corner": "bottom-left",
    "phase": "Crystal Gardening"
  },
  {
    "id": 4,
    "slide": 4,
    "images": [
      "assets/slides/slide_05.jpg"
    ],
    "title": "Material Sourcing: Substrates",
    "date": "Day 15",
    "description": "",
    "bgColor": "rgb(38, 1, 1)",
    "textColor": "rgb(242, 169, 169)",
    "corner": "top-left",
    "phase": "Crystal Gardening"
  },
  {
    "id": 5,
    "slide": 5,
    "images": [
      "assets/slides/slide_06.jpg"
    ],
    "title": "Material Sourcing: Electronics",
    "date": "Day 18",
    "description": "",
    "bgColor": "rgb(38, 1, 1)",
    "textColor": "rgb(242, 169, 169)",
    "corner": "top-right",
    "phase": "Crystal Gardening"
  },
  {
    "id": 6,
    "slide": 6,
    "images": [
      "assets/slides/slide_07.jpg"
    ],
    "title": "Prototyping Sensor Networks",
    "date": "Day 22",
    "description": "",
    "bgColor": "rgb(38, 12, 1)",
    "textColor": "rgb(242, 190, 169)",
    "corner": "bottom-right",
    "phase": "Crystal Gardening"
  },
  {
    "id": 7,
    "slide": 7,
    "images": [
      "assets/slides/slide_08.jpg"
    ],
    "title": "Audio Synthesis Design",
    "date": "Day 25",
    "description": "",
    "bgColor": "rgb(38, 4, 1)",
    "textColor": "rgb(242, 175, 169)",
    "corner": "bottom-left",
    "phase": "Crystal Gardening"
  },
  {
    "id": 8,
    "slide": 8,
    "images": [
      "assets/slides/slide_09.jpg"
    ],
    "title": "Fabrication Phase: Enclosures",
    "date": "Day 30",
    "description": "",
    "bgColor": "rgb(38, 1, 3)",
    "textColor": "rgb(242, 169, 171)",
    "corner": "top-left",
    "phase": "Crystal Gardening"
  },
  {
    "id": 9,
    "slide": 9,
    "images": [
      "assets/slides/slide_10.jpg"
    ],
    "title": "Plumbing and Flow Controls",
    "date": "Day 35",
    "description": "",
    "bgColor": "rgb(38, 18, 1)",
    "textColor": "rgb(242, 202, 169)",
    "corner": "top-right",
    "phase": "Crystal Gardening"
  },
  {
    "id": 10,
    "slide": 10,
    "images": [
      "assets/slides/slide_11.jpg"
    ],
    "title": "Integration Testing: Electronics & Frame",
    "date": "Day 40",
    "description": "",
    "bgColor": "rgb(38, 20, 1)",
    "textColor": "rgb(242, 205, 169)",
    "corner": "bottom-right",
    "phase": "Sculpting"
  },
  {
    "id": 11,
    "slide": 11,
    "images": [
      "assets/slides/slide_12.jpg"
    ],
    "title": "Calibrating Ambient Light Projections",
    "date": "Day 45",
    "description": "",
    "bgColor": "rgb(1, 1, 38)",
    "textColor": "rgb(169, 169, 242)",
    "corner": "bottom-left",
    "phase": "Sculpting"
  },
  {
    "id": 12,
    "slide": 12,
    "images": [
      "assets/slides/slide_13.jpg"
    ],
    "title": "First Live Power-On Sequence",
    "date": "Day 50",
    "description": "",
    "bgColor": "rgb(38, 15, 1)",
    "textColor": "rgb(242, 196, 169)",
    "corner": "top-left",
    "phase": "Sculpting"
  },
  {
    "id": 13,
    "slide": 13,
    "images": [
      "assets/slides/slide_14.jpg"
    ],
    "title": "Software Control Interface",
    "date": "Day 55",
    "description": "",
    "bgColor": "rgb(38, 20, 1)",
    "textColor": "rgb(242, 205, 169)",
    "corner": "top-right",
    "phase": "Sculpting"
  },
  {
    "id": 14,
    "slide": 14,
    "images": [
      "assets/slides/slide_15.jpg"
    ],
    "title": "Acoustic Feedback Tuning",
    "date": "Day 60",
    "description": "",
    "bgColor": "rgb(38, 15, 1)",
    "textColor": "rgb(242, 197, 169)",
    "corner": "bottom-right",
    "phase": "Sculpting"
  },
  {
    "id": 15,
    "slide": 15,
    "images": [
      "assets/slides/slide_16.jpg"
    ],
    "title": "Substrate Layering",
    "date": "Day 65",
    "description": "",
    "bgColor": "rgb(38, 18, 1)",
    "textColor": "rgb(242, 203, 169)",
    "corner": "bottom-left",
    "phase": "Sculpting"
  },
  {
    "id": 16,
    "slide": 16,
    "images": [
      "assets/slides/slide_17.jpg"
    ],
    "title": "Testing Chemical Interactions",
    "date": "Day 70",
    "description": "",
    "bgColor": "rgb(38, 22, 1)",
    "textColor": "rgb(242, 211, 169)",
    "corner": "top-left",
    "phase": "Sculpting"
  },
  {
    "id": 17,
    "slide": 17,
    "images": [
      "assets/slides/slide_18.jpg"
    ],
    "title": "Thermal Mapping Validation",
    "date": "Day 74",
    "description": "",
    "bgColor": "rgb(38, 20, 1)",
    "textColor": "rgb(242, 205, 169)",
    "corner": "top-right",
    "phase": "Sculpting"
  },
  {
    "id": 18,
    "slide": 18,
    "images": [
      "assets/slides/slide_19.jpg"
    ],
    "title": "Atmospheric Seal Testing",
    "date": "Day 78",
    "description": "",
    "bgColor": "rgb(38, 20, 1)",
    "textColor": "rgb(242, 205, 169)",
    "corner": "bottom-right",
    "phase": "Sculpting"
  },
  {
    "id": 19,
    "slide": 19,
    "images": [
      "assets/slides/slide_20.jpg"
    ],
    "title": "Pre-Installation Checklists",
    "date": "Day 82",
    "description": "",
    "bgColor": "rgb(38, 22, 1)",
    "textColor": "rgb(242, 209, 169)",
    "corner": "bottom-left",
    "phase": "Sculpting"
  },
  {
    "id": 20,
    "slide": 20,
    "images": [
      "assets/slides/slide_21.jpg"
    ],
    "title": "Gallery Transport",
    "date": "Day 85",
    "description": "",
    "bgColor": "rgb(38, 24, 1)",
    "textColor": "rgb(242, 214, 169)",
    "corner": "top-left",
    "phase": "Sculpting"
  },
  {
    "id": 21,
    "slide": 21,
    "images": [
      "assets/slides/slide_22.jpg"
    ],
    "title": "On-Site Assembly",
    "date": "Day 88",
    "description": "",
    "bgColor": "rgb(38, 38, 1)",
    "textColor": "rgb(242, 242, 169)",
    "corner": "top-right",
    "phase": "Sculpting"
  },
  {
    "id": 22,
    "slide": 22,
    "images": [
      "assets/slides/slide_23.jpg"
    ],
    "title": "Final Wiring & Cable Management",
    "date": "Day 90",
    "description": "",
    "bgColor": "rgb(38, 1, 14)",
    "textColor": "rgb(242, 169, 193)",
    "corner": "bottom-right",
    "phase": "Gallery"
  },
  {
    "id": 23,
    "slide": 23,
    "images": [
      "assets/slides/slide_24a.jpg",
      "assets/slides/slide_24b.jpg"
    ],
    "title": "Dry Calibration & Software Lock",
    "date": "Day 92",
    "description": "",
    "bgColor": "rgb(1, 34, 38)",
    "textColor": "rgb(169, 235, 242)",
    "corner": "bottom-left",
    "phase": "Gallery"
  },
  {
    "id": 24,
    "slide": 24,
    "images": [
      "assets/slides/slide_25.jpg"
    ],
    "title": "Official Power-up & Soundcheck",
    "date": "Day 94",
    "description": "",
    "bgColor": "rgb(28, 1, 38)",
    "textColor": "rgb(222, 169, 242)",
    "corner": "top-left",
    "phase": "Gallery"
  },
  {
    "id": 25,
    "slide": 25,
    "images": [
      "assets/slides/slide_26.jpg"
    ],
    "title": "Exhibition Opening",
    "date": "Day 95",
    "description": "",
    "bgColor": "rgb(24, 1, 38)",
    "textColor": "rgb(214, 169, 242)",
    "corner": "top-right",
    "phase": "Gallery"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = timelineData;
} else {
  window.timelineData = timelineData;
}
