# 섹션: 동시성 기초 (threading/multiprocessing/asyncio)
import asyncio
import time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor


# I/O bound: 동시에 여러 스레드로 대기
def download(url: str) -> str:
    time.sleep(0.5)  # 네트워크 대기를 흉내
    return f"downloaded: {url}"


# CPU bound: 여러 프로세스로 진짜 병렬 계산
def heavy_square(n: int) -> int:
    return sum(i * i for i in range(n))


# asyncio: 단일 스레드에서 수많은 대기를 동시에 처리
async def fetch(session_id: int) -> str:
    await asyncio.sleep(0.5)  # 반드시 asyncio용 sleep — time.sleep은 이벤트 루프를 멈춤
    return f"session {session_id} done"


async def main_async() -> None:
    results = await asyncio.gather(*(fetch(i) for i in range(10)))
    print(results)


# ProcessPoolExecutor는 자식 프로세스가 이 파일을 다시 import한다.
# Windows·macOS(spawn 방식)에서는 이 가드가 없으면 자식이 또 풀을 만들려다 오류가 난다.
if __name__ == "__main__":
    start = time.perf_counter()
    with ThreadPoolExecutor(max_workers=4) as pool:
        print(list(pool.map(download, ["a.com", "b.com", "c.com"])))
    print(f"threads: {time.perf_counter() - start:.2f}s (0.5초 × 3이 아니라 약 0.5초)")

    start = time.perf_counter()
    with ProcessPoolExecutor(max_workers=4) as pool:
        print(list(pool.map(heavy_square, [2_000_000] * 4)))
    print(f"processes: {time.perf_counter() - start:.2f}s")

    start = time.perf_counter()
    asyncio.run(main_async())
    print(f"asyncio: {time.perf_counter() - start:.2f}s (10개를 동시에 대기)")
