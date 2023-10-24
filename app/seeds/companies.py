from app.models import db, Company, environment, SCHEMA
from sqlalchemy.sql import text

def seed_companies():

    company1 = Company(name='Nintendo', ticker='NTDOY', price=100.5, ceo='Shuntaro Furukawa', employees=5000, headquarters='Kyoto, Kyoto', founded=1889, marketcap=5000000000.0, pe_ratio=25.5, div_yield=2.5, avg_volume=1000000, high=105.0, low=95.0, open_price=100.0, volume=1050000, week_high=110.0, week_low=90.0)

    company2 = Company(name='Microsoft', ticker='MSFT', price=210.5, ceo='Satya Nadella', employees=13000, headquarters='Redmond, Washington', founded=1975, marketcap=11000000000.0, pe_ratio=29.5, div_yield=2.0, avg_volume=1200000, high=215.0, low=205.0, open_price=209.5, volume=1190000, week_high=220.0, week_low=200.0)

    company3 = Company(name='Apple', ticker='AAPL', price=132.5, ceo='Tim Cook', employees=15000, headquarters='Cupertino, California', founded=1976, marketcap=12000000000.0, pe_ratio=28.5, div_yield=1.8, avg_volume=1500000, high=137.0, low=128.0, open_price=131.5, volume=1480000, week_high=139.0, week_low=126.0)

    company4 = Company(name='Amazon', ticker='AMZN', price=3150.2, ceo='Andy Jassy', employees=23000, headquarters='Seattle, Washington', founded=1994, marketcap=13000000000.0, pe_ratio=31.0, div_yield=1.5, avg_volume=1650000, high=3180.0, low=3120.0, open_price=3148.5, volume=1635000, week_high=3195.0, week_low=3105.0)

    company5 = Company(name='Tesla', ticker='TSLA', price=695.3, ceo='Elon Musk', employees=25000, headquarters='Austin, Texas', founded=2003, marketcap=14000000000.0, pe_ratio=30.5, div_yield=1.2, avg_volume=1800000, high=700.0, low=690.0, open_price=694.5, volume=1785000, week_high=705.0, week_low=685.0)

    company6 = Company(name='Facebook', ticker='FB', price=275.5, ceo='Mark Zuckerberg', employees=19000, headquarters='Menlo Park, California', founded=2004, marketcap=12500000000.0, pe_ratio=27.8, div_yield=1.7, avg_volume=1550000, high=279.0, low=272.0, open_price=274.5, volume=1535000, week_high=282.0, week_low=270.0)

    company7 = Company(name='Google', ticker='GOOGL', price=2523.4, ceo='Sundar Pichai', employees=18000, headquarters='Mountain View, California', founded=1998, marketcap=15000000000.0, pe_ratio=29.0, div_yield=1.1, avg_volume=1900000, high=2535.0, low=2520.0, open_price=2524.0, volume=1895000, week_high=2540.0, week_low=2510.0)

    company8 = Company(name='Netflix', ticker='NFLX', price=490.6, ceo='Ted Sarandos', employees=8600, headquarters='Los Gatos, California', founded=1997, marketcap=11050000000.0, pe_ratio=28.7, div_yield=1.3, avg_volume=1750000, high=495.0, low=487.0, open_price=489.5, volume=1740000, week_high=498.0, week_low=485.0)

    company9 = Company(name='NVIDIA', ticker='NVDA', price=620.3, ceo='Jensen Huang', employees=13700, headquarters='Santa Clara, California', founded=1993, marketcap=14500000000.0, pe_ratio=32.2, div_yield=0.9, avg_volume=2200000, high=625.0, low=616.0, open_price=619.5, volume=2190000, week_high=629.0, week_low=612.0)

    company10 = Company(name='Adobe', ticker='ADBE', price=480.2, ceo='Shantanu Narayen', employees=22000, headquarters='San Jose, California', founded=1982, marketcap=13050000000.0, pe_ratio=30.8, div_yield=1.0, avg_volume=1650000, high=483.0, low=477.0, open_price=479.5, volume=1640000, week_high=485.0, week_low=475.0)

    company11 = Company(name='Oracle', ticker='ORCL', price=77.9, ceo='Safra Catz', employees=136000, headquarters='Redwood City, California', founded=1977, marketcap=18000000000.0, pe_ratio=29.5, div_yield=1.6, avg_volume=1500000, high=78.5, low=77.0, open_price=77.7, volume=1495000, week_high=79.0, week_low=76.0)

    company12 = Company(name='Walmart', ticker='WMT', price=145.7, ceo='Doug McMillon', employees=2200000, headquarters='Bentonville, Arkansas', founded=1962, marketcap=40000000000.0, pe_ratio=21.4, div_yield=1.9, avg_volume=3000000, high=150.0, low=140.0, open_price=145.5, volume=2900000, week_high=155.0, week_low=135.0)

    company13 = Company(name='Johnson & Johnson', ticker='JNJ', price=165.2, ceo='Alex Gorsky', employees=135000, headquarters='New Brunswick, New Jersey', founded=1886, marketcap=35000000000.0, pe_ratio=18.8, div_yield=2.4, avg_volume=2500000, high=170.0, low=160.0, open_price=165.0, volume=2550000, week_high=175.0, week_low=155.0)

    company14 = Company(name='Procter & Gamble', ticker='PG', price=130.6, ceo='David S. Taylor', employees=100000, headquarters='Cincinnati, Ohio', founded=1837, marketcap=30000000000.0, pe_ratio=20.3, div_yield=2.2, avg_volume=1800000, high=135.0, low=125.0, open_price=130.5, volume=1750000, week_high=140.0, week_low=120.0)

    company15 = Company(name='Coca-Cola', ticker='KO', price=56.8, ceo='James Quincey', employees=80000, headquarters='Atlanta, Georgia', founded=1892, marketcap=20000000000.0, pe_ratio=23.1, div_yield=3.0, avg_volume=1500000, high=58.0, low=55.0, open_price=56.7, volume=1550000, week_high=60.0, week_low=54.0)

    company16 = Company(name='IBM', ticker='IBM', price=121.9, ceo='Arvind Krishna', employees=345000, headquarters='Armonk, New York', founded=1911, marketcap=15000000000.0, pe_ratio=14.9, div_yield=4.1, avg_volume=1200000, high=125.0, low=120.0, open_price=121.5, volume=1230000, week_high=130.0, week_low=118.0)

    company17 = Company(name='The Walt Disney Company', ticker='DIS', price=176.4, ceo='Bob Chapek', employees=220000, headquarters='Burbank, California', founded=1923, marketcap=25000000000.0, pe_ratio=19.5, div_yield=1.8, avg_volume=1400000, high=180.0, low=172.0, open_price=175.5, volume=1450000, week_high=185.0, week_low=168.0)

    company18 = Company(name='Verizon Communications', ticker='VZ', price=58.7, ceo='Hans Vestberg', employees=135000, headquarters='New York City, New York', founded=1983, marketcap=20000000000.0, pe_ratio=12.7, div_yield=4.5, avg_volume=1100000, high=60.0, low=57.0, open_price=58.6, volume=1120000, week_high=62.0, week_low=56.0)

    company19 = Company(name='Intel Corporation', ticker='INTC', price=53.2, ceo='Pat Gelsinger', employees=110000, headquarters='Santa Clara, California', founded=1968, marketcap=17000000000.0, pe_ratio=15.8, div_yield=3.2, avg_volume=1300000, high=55.0, low=52.0, open_price=53.1, volume=1350000, week_high=57.0, week_low=50.0)

    company20 = Company(name='Pfizer', ticker='PFE', price=43.6, ceo='Albert Bourla', employees=88000, headquarters='New York City, New York', founded=1849, marketcap=16000000000.0, pe_ratio=14.2, div_yield=3.8, avg_volume=950000, high=45.0, low=43.0, open_price=43.5, volume=970000, week_high=47.0, week_low=42.0)

    company21 = Company(name='General Electric', ticker='GE', price=102.4, ceo='H. Lawrence Culp Jr.', employees=205000, headquarters='Boston, Massachusetts', founded=1892, marketcap=8000000000.0, pe_ratio=9.7, div_yield=4.2, avg_volume=3500000, high=105.0, low=100.0, open_price=102.0, volume=3550000, week_high=110.0, week_low=98.0)

    company22 = Company(name='McDonald\'s', ticker='MCD', price=225.6, ceo='Chris Kempczinski', employees=205000, headquarters='Chicago, Illinois', founded=1955, marketcap=17000000000.0, pe_ratio=22.3, div_yield=2.1, avg_volume=2800000, high=230.0, low=220.0, open_price=225.5, volume=2850000, week_high=240.0, week_low=215.0)

    company23 = Company(name='AT&T', ticker='T', price=27.8, ceo='John Stankey', employees=230000, headquarters='Dallas, Texas', founded=1876, marketcap=15000000000.0, pe_ratio=9.6, div_yield=6.2, avg_volume=4200000, high=29.0, low=27.0, open_price=27.7, volume=4250000, week_high=30.0, week_low=26.0)

    company24 = Company(name='Boeing', ticker='BA', price=190.3, ceo='David L. Calhoun', employees=140000, headquarters='Chicago, Illinois', founded=1916, marketcap=9500000000.0, pe_ratio=16.8, div_yield=3.8, avg_volume=2200000, high=195.0, low=185.0, open_price=190.0, volume=2250000, week_high=205.0, week_low=180.0)

    company25 = Company(name='Cisco Systems', ticker='CSCO', price=54.7, ceo='Chuck Robbins', employees=79000, headquarters='San Jose, California', founded=1984, marketcap=17000000000.0, pe_ratio=19.3, div_yield=3.3, avg_volume=2600000, high=56.0, low=53.0, open_price=54.5, volume=2650000, week_high=58.0, week_low=52.0)

    company26 = Company(name='Visa Inc.', ticker='V', price=230.8, ceo='Alfred F. Kelly Jr.', employees=21000, headquarters='Foster City, California', founded=1958, marketcap=5000000000.0, pe_ratio=41.2, div_yield=0.6, avg_volume=1800000, high=235.0, low=228.0, open_price=230.5, volume=1850000, week_high=240.0, week_low=225.0)

    company27 = Company(name='JPMorgan Chase & Co.', ticker='JPM', price=150.9, ceo='Jamie Dimon', employees=256000, headquarters='New York City, New York', founded=1799, marketcap=30000000000.0, pe_ratio=12.9, div_yield=2.9, avg_volume=3100000, high=155.0, low=148.0, open_price=150.0, volume=3150000, week_high=160.0, week_low=145.0)

    company28 = Company(name='Hewlett Packard Enterprise', ticker='HPE', price=17.5, ceo='Antonio Neri', employees=60000, headquarters='San Jose, California', founded=1939, marketcap=7000000000.0, pe_ratio=10.1, div_yield=3.4, avg_volume=1500000, high=18.0, low=17.0, open_price=17.4, volume=1550000, week_high=19.0, week_low=16.0)

    company29 = Company(name='Exxon Mobil Corporation', ticker='XOM', price=57.2, ceo='Darren W. Woods', employees=72000, headquarters='Irving, Texas', founded=1999, marketcap=10000000000.0, pe_ratio=17.6, div_yield=5.2, avg_volume=2900000, high=60.0, low=55.0, open_price=57.0, volume=2950000, week_high=65.0, week_low=50.0)

    company30 = Company(name='Hasbro', ticker='HAS', price=65.2, ceo='Brian Goldner', employees=58000, headquarters='Pawtucket, Rhode Island', founded=1923, marketcap=12000000000.0, pe_ratio=18.6, div_yield=2.5, avg_volume=880000, high=68.0, low=63.0, open_price=65.5, volume=875000, week_high=70.0, week_low=60.0)

    company31 = Company(name='Sega Sammy Holdings, Inc', ticker='SGAMY', price=65.8, ceo='Haruki Satomi', employees=5177, headquarters='Tokyo, Japan', founded=1951, marketcap=3300000000.0, pe_ratio=14.5, div_yield=1.2, avg_volume=1200000, high=68.0, low=64.5, open_price=66.0, volume=1180000, week_high=70.0, week_low=63.5)

    company32 = Company(name='Capcom Co., Ltd.', ticker='CCOEY', price=60.7, ceo='Kenzo Tsujimoto', employees=2705, headquarters='Osaka, Japan', founded=1979, marketcap=8000000000.0, pe_ratio=15.9, div_yield=1.5, avg_volume=900000, high=63.0, low=60.0, open_price=61.5, volume=920000, week_high=65.0, week_low=58.5)

    company33 = Company(name='Sony Corporation', ticker='SNE', price=120.5, ceo='Kenichiro Yoshida', employees=114400, headquarters='Tokyo, Japan', founded=1946, marketcap=150000000000.0, pe_ratio=20.5, div_yield=0.8, avg_volume=1500000, high=125.0, low=115.0, open_price=118.0, volume=1550000, week_high=130.0, week_low=110.0)

    company34 = Company(name='Bandai Namco Holdings Inc.', ticker='BNHDF', price=74.3, ceo='Mitsuaki Taguchi', employees=8581, headquarters='Tokyo, Japan', founded=1950, marketcap=8500000000.0, pe_ratio=19.8, div_yield=1.7, avg_volume=980000, high=76.5, low=73.5, open_price=74.7, volume=965000, week_high=78.0, week_low=71.5)

    company35 = Company(name='The Pokémon Company', ticker='POKE', price=180.5, ceo='Tsunekazu Ishihara', employees=500, headquarters='Tokyo, Japan', founded=1998, marketcap=15000000000.0, pe_ratio=26.8, div_yield=1.5, avg_volume=750000, high=185.0, low=175.0, open_price=180.2, volume=740000, week_high=190.0, week_low=170.0)

    company36 = Company(name='Paramount Pictures Corporation', ticker='PARMT', price=85.4, ceo='Brian Robbins', employees=4500, headquarters='Los Angeles, California, USA', founded=1912, marketcap=13000000000.0, pe_ratio=18.2, div_yield=1.2, avg_volume=750000, high=88.0, low=82.5, open_price=84.0, volume=780000, week_high=90.0, week_low=80.0)

    company37 = Company(name='SNK Corporation', ticker='SNKCP', price=45.3, ceo='Ge Zhihui', employees=250, headquarters='Osaka, Japan', founded=1978, marketcap=500000000.0, pe_ratio=12.7, div_yield=0.8, avg_volume=300000, high=48.0, low=43.0, open_price=44.5, volume=310000, week_high=49.5, week_low=42.0)

    company38 = Company(name='HBO', ticker='HBO', price=35.5, ceo='Casey Bloys', employees=6000, headquarters='New York City, New York', founded=1972, marketcap=9000000000.0, pe_ratio=15.8, div_yield=2.1, avg_volume=1100000, high=37.0, low=34.0, open_price=35.2, volume=1120000, week_high=38.0, week_low=33.0)

    company39 = Company(name='GameStop', ticker='GME', price=150.2, ceo='Matt Furlong', employees=14000, headquarters='Grapevine, Texas', founded=1984, marketcap=7000000000.0, pe_ratio=10.5, div_yield=1.2, avg_volume=2100000, high=155.0, low=145.0, open_price=150.5, volume=2150000, week_high=160.0, week_low=140.0)

    company40 = Company(name='Subaru Corporation', ticker='FUJHY', price=78.4, ceo='Tomomi Nakamura', employees=15000, headquarters='Tokyo, Japan', founded=1953, marketcap=20000000000.0, pe_ratio=14.5, div_yield=1.8, avg_volume=750000, high=80.5, low=76.0, open_price=77.5, volume=780000, week_high=82.0, week_low=74.5)

    company41 = Company(name='Honda Motor Co., Ltd.', ticker='HMC', price=32.5, ceo='Toshihiro Mibe', employees=220000, headquarters='Tokyo, Japan', founded=1948, marketcap=55000000000.0, pe_ratio=9.8, div_yield=3.5, avg_volume=2800000, high=34.0, low=31.0, open_price=32.7, volume=2850000, week_high=36.0, week_low=30.0)

    company42 = Company(name='Suzuki Motor Corporation', ticker='SZKMY', price=50.2, ceo='Toshihiro Suzuki', employees=60000, headquarters='Hamamatsu, Japan', founded=1909, marketcap=9000000000.0, pe_ratio=12.7, div_yield=2.9, avg_volume=1600000, high=52.0, low=48.0, open_price=50.5, volume=1650000, week_high=54.0, week_low=47.0)

    company43 = Company(name='Ubisoft Entertainment', ticker='UBSFY', price=75.6, ceo='Yves Guillemot', employees=18500, headquarters='Montreuil, France', founded=1986, marketcap=10000000000.0, pe_ratio=18.3, div_yield=1.5, avg_volume=1200000, high=78.0, low=73.0, open_price=76.5, volume=1250000, week_high=82.0, week_low=70.0)

    company44 = Company(name='Renault SA', ticker='RNLSY', price=32.3, ceo='Luca de Meo', employees=180000, headquarters='Boulogne-Billancourt, France', founded=1899, marketcap=25000000000.0, pe_ratio=11.6, div_yield=2.2, avg_volume=850000, high=33.5, low=31.0, open_price=32.0, volume=830000, week_high=34.0, week_low=30.5)

    company45 = Company(name='CD Projekt', ticker='CDP', price=92.4, ceo='Adam Kiciński', employees=4100, headquarters='Warsaw, Poland', founded=1994, marketcap=6000000000.0, pe_ratio=14.8, div_yield=1.2, avg_volume=750000, high=96.0, low=90.0, open_price=92.0, volume=780000, week_high=100.0, week_low=88.0)

    company46 = Company(name='Mazda Motor Corporation', ticker='MZDAY', price=14.7, ceo='Akira Marumoto', employees=49000, headquarters='Hiroshima, Japan', founded=1920, marketcap=8000000000.0, pe_ratio=10.5, div_yield=2.0, avg_volume=650000, high=15.2, low=14.2, open_price=14.5, volume=620000, week_high=15.5, week_low=13.8)

    company47 = Company(name='Ferrari', ticker='RACE', price=225.7, ceo='Benedetto Vigna', employees=4500, headquarters='Maranello, Italy', founded=1947, marketcap=35000000000.0, pe_ratio=25.4, div_yield=0.6, avg_volume=800000, high=230.0, low=222.0, open_price=224.5, volume=810000, week_high=235.0, week_low=218.0)

    company48 = Company(name='Toyota', ticker='TM', price=155.2, ceo='Akio Toyoda', employees=370000, headquarters='Toyota City, Japan', founded=1937, marketcap=220000000000.0, pe_ratio=10.5, div_yield=2.7, avg_volume=2100000, high=158.0, low=153.0, open_price=154.5, volume=2150000, week_high=162.0, week_low=150.0)

    company49 = Company(name='Porsche', ticker='POAHY', price=100.2, ceo='Oliver Blume', employees=35000, headquarters='Stuttgart, Germany', founded=1931, marketcap=50000000000.0, pe_ratio=8.5, div_yield=3.1, avg_volume=1200000, high=105.0, low=98.0, open_price=99.5, volume=1250000, week_high=110.0, week_low=96.0)

    company50 = Company(name='Ford Motor Company', ticker='F', price=12.8, ceo='Jim Farley', employees=190000, headquarters='Dearborn, Michigan', founded=1903, marketcap=45000000000.0, pe_ratio=9.3, div_yield=3.9, avg_volume=4500000, high=13.0, low=12.0, open_price=12.7, volume=4550000, week_high=14.0, week_low=11.0)






    db.session.add(company1)
    db.session.add(company2)
    db.session.add(company3)
    db.session.add(company4)
    db.session.add(company5)
    db.session.add(company6)
    db.session.add(company7)
    db.session.add(company8)
    db.session.add(company9)
    db.session.add(company10)
    db.session.add(company11)
    db.session.add(company12)
    db.session.add(company13)
    db.session.add(company14)
    db.session.add(company15)
    db.session.add(company16)
    db.session.add(company17)
    db.session.add(company18)
    db.session.add(company19)
    db.session.add(company20)
    db.session.add(company21)
    db.session.add(company22)
    db.session.add(company23)
    db.session.add(company24)
    db.session.add(company25)
    db.session.add(company26)
    db.session.add(company27)
    db.session.add(company28)
    db.session.add(company29)
    db.session.add(company30)
    db.session.add(company31)
    db.session.add(company32)
    db.session.add(company33)
    db.session.add(company34)
    db.session.add(company35)
    db.session.add(company36)
    db.session.add(company37)
    db.session.add(company38)
    db.session.add(company39)
    db.session.add(company40)
    db.session.add(company41)
    db.session.add(company42)
    db.session.add(company43)
    db.session.add(company44)
    db.session.add(company45)
    db.session.add(company46)
    db.session.add(company47)
    db.session.add(company48)
    db.session.add(company49)
    db.session.add(company50)



    db.session.commit()

def undo_companies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM companies"))

    db.session.commit()
