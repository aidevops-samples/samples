"""테스트 섹션의 monkeypatch 예제에서 쓰는 날씨 API 클라이언트.

실제 네트워크 호출은 _get 한 곳에만 모아 두었다. 테스트에서는 이 메서드만
가짜로 바꾸면 나머지 로직(응답 해석, 오류 처리)을 네트워크 없이 검증할 수 있다.
"""

import requests

BASE_URL = "https://api.example.com/v1/weather"


class WeatherApiError(Exception):
    """날씨 API 응답을 해석할 수 없을 때 발생한다."""


class WeatherClient:
    def __init__(self, api_key: str, timeout: float = 3.0) -> None:
        self._api_key = api_key
        self._timeout = timeout

    def _get(self, url: str) -> dict:
        # 외부 호출에는 항상 timeout을 둔다
        response = requests.get(
            url,
            headers={"Authorization": f"Bearer {self._api_key}"},
            timeout=self._timeout,
        )
        response.raise_for_status()
        return response.json()

    def current_temperature(self, city: str) -> float:
        data = self._get(f"{BASE_URL}?city={city}")
        if "temp" not in data:
            raise WeatherApiError(f"응답에 temp 필드가 없습니다: {data}")
        return float(data["temp"])
