import pytest
from app.weather import WeatherApiError, WeatherClient


@pytest.fixture
def client() -> WeatherClient:
    # 각 테스트마다 새로 생성되는 재사용 가능한 준비물
    return WeatherClient(api_key="test-key")


def test_parses_temperature(client: WeatherClient, monkeypatch: pytest.MonkeyPatch):
    def fake_get(url: str) -> dict:
        return {"temp": 21.5}

    # 실제 네트워크 호출 대신 가짜 함수로 대체
    monkeypatch.setattr(client, "_get", fake_get)

    assert client.current_temperature("Seoul") == 21.5


def test_missing_field_raises(client: WeatherClient, monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setattr(client, "_get", lambda url: {"humidity": 40})

    with pytest.raises(WeatherApiError):
        client.current_temperature("Seoul")


def test_passes_city_in_url(client: WeatherClient, monkeypatch: pytest.MonkeyPatch):
    seen: list[str] = []

    def fake_get(url: str) -> dict:
        seen.append(url)
        return {"temp": "18"}

    monkeypatch.setattr(client, "_get", fake_get)

    assert client.current_temperature("Busan") == 18.0
    assert seen[0].endswith("city=Busan")
