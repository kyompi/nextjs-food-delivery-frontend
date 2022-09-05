import Link from 'next/link'
import { Card, CardBody, CardImg, CardTitle, Col, Row } from 'reactstrap'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`

const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(query)

  if (error) return 'Restaurantの読み込みに失敗しました'

  if (loading) return <h1>ロード中・・・</h1>

  if (data) {
    const searchQuery = data.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(props.search),
    )

    return (
      <Row>
        {searchQuery.map((res) => (
          <Col xs="6" sm="4" key={res.id}>
            <Card style={{ margin: '0 .5rem 20px .5rem' }}>
              <CardImg
                src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                top={true}
                style={{ height: 250 }}
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardTitle>{res.description}</CardTitle>
              </CardBody>
              <div className="card-footer">
                <Link
                  as={`/restaurants/${res.id}`}
                  href={`/restaurants?id=${res.id}`}>
                  <a className="btn btn-primary">もっと見る</a>
                </Link>
              </div>
            </Card>
          </Col>
        ))}

        <style jsx>
          {`
            a {
              color: white;
            }
            a:link {
              text-decoration: none;
              color: white;
            }
            a:hover {
              color: white;
            }
            .card-columns {
              column-count: 3;
            }
          `}
        </style>
      </Row>
    )
  } else {
    return <h1>Restaurantが見つかりませんでした。</h1>
  }
}

export default RestaurantList
