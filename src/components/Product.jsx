import { Badge, Button, Card } from 'keep-react';

const Product = ({ title, description, brand, thumbnail, price }) => {
    return (
        <Card
            className="overflow-hidden rounded-md object-cover"
            imgSrc={thumbnail}
            imgSize="md"
        >
            <Card.Container className="p-4">
                <Card.Container className="flex items-center justify-between">
                    <Badge size="xs" colorType="light" color="gray">
                        {brand}
                    </Badge>
                    <Card.Title>${price}</Card.Title>
                </Card.Container>
                <Card.Container className="my-3">
                    <Card.Title>{title}</Card.Title>
                    <Card.Description>{description}</Card.Description>
                </Card.Container>
                <Card.Container className="flex items-center justify-start gap-5">
                    <Button size="sm" type="outlineGray">
                        Add To Cart
                    </Button>
                </Card.Container>
            </Card.Container>
        </Card>
    );
};

export default Product;
