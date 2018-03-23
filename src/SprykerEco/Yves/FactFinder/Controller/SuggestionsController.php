<?php

/**
 * MIT License
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

namespace SprykerEco\Yves\FactFinder\Controller;

use Generated\Shared\Transfer\FactFinderSdkSuggestRequestTransfer;
use Spryker\Yves\Kernel\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

/**
 * @method \SprykerEco\Yves\FactFinder\FactFinderFactory getFactory()
 */
class SuggestionsController extends AbstractController
{
    /**
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function indexAction(Request $request)
    {
        $factFinderSuggestRequestTransfer = new FactFinderSdkSuggestRequestTransfer();
        $query = $request->query->get('query', '*');
        $query = urlencode($query);

        $factFinderSuggestRequestTransfer->setQuery($query);

        $response = $this->getFactory()
            ->getFactFinderClient()
            ->getSuggestions($factFinderSuggestRequestTransfer);

        if (!$response->getSuggestions()) {
            return $this->jsonResponse(null, 400);
        }

        return $this->jsonResponse($response->getSuggestions());
    }
}
