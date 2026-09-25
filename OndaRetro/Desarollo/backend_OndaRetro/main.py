# main:

import uvicorn

def start():
    print("Starting server...")
    uvicorn.run(
                "presentation.webApiOndaRetro:app",
                host="127.0.0.1",
                port=7000,
                reload=True
                )
    print("Server is running.")

if __name__ == "__main__":
    start()