from app.cli import main


def test_main_prints_sum(capsys):
    main()
    assert capsys.readouterr().out.strip() == "5"
