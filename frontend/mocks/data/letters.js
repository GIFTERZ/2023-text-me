const letters = [
  {
    id: 1,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "주인냥이",
    content:
      "올 한해 정말 즐거웠다\n 내년에는 츄르 좀 더 많이 주고 \n엉덩이도 자주 뚜들겨 줘라 \n그렇다고 눈치없이 싫다는데 했다가 얻어맞지 말고 \n나는 산타할아버지한테 신상 장난감 받고싶다고 전해줘라",
  },
  {
    id: 2,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content:
      "해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n해피 크리스마스!\n",
  },
  {
    id: 3,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 4,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 5,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 6,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 7,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
  {
    id: 8,
    cardImg:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2hyaXN0bWFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60",
    writer: "김채은",
    content: "해피 크리스마스!",
  },
];

export { letters };
